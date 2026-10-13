import dbConnect from "../mongoose";
import mongoose from "mongoose";
import { SignInWithOAuthSchema } from "../validations";
import { ValidationError } from "../http-errors";
import User from "@/database/user.model";
import slugify from "slugify";
import Account from "@/database/account.model";
import logger from "../logger";

export async function provisionOauthUser({
  provider,
  providerAccountId,
  user,
}: SignInWithOAuthParams) {
  let session: mongoose.ClientSession | undefined;

  try {
    await dbConnect();
    session = await mongoose.startSession();
    session.startTransaction();

    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    const { name, username, email, image } = user;

    const slugifiedUsername = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({ email }).session(session);

    if (!existingUser) {
      [existingUser] = await User.create(
        [
          {
            name,
            username: slugifiedUsername,
            email,
            image,
          },
        ],
        { session },
      );
    } else {
      // update the existing user with the new name, image
      const updatedData: { name?: string; image?: string } = {};
      if (name) updatedData.name = name;
      if (image) updatedData.image = image;
      const updatedUser = await User.findByIdAndUpdate(
        existingUser._id,
        updatedData,
        { new: true, session },
      );
      existingUser = updatedUser;
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session },
      );
    }

    await session.commitTransaction();
    return true;
  } catch (error: unknown) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }
    logger.error({ err: error, provider }, "OAuth user provisioning failed");
    throw error;
  } finally {
    await session?.endSession();
  }
}
