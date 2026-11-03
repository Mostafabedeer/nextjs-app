"use server";

import User from "@/database/user.model";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { SignInSchema, SignUpSchema } from "../validations";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Account from "@/database/account.model";
import { signIn, signOut } from "@/auth";
import { NotFoundError } from "../http-errors";
import ROUTES from "@/constants/routes";

export async function SignUpWithCradentialsAction(
  params: AuthCradentialsParams,
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignUpSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({
      email,
    }).session(session);

    if (existingUser) {
      throw new Error("User already exists.");
    }

    const existingUserName = await User.findOne({
      username,
    }).session(session);
    if (existingUserName) {
      throw new Error("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await User.create(
      [{ name, username, email, password: hashedPassword }],
      {
        session,
      },
    );

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      {
        session,
      },
    );

    await session.commitTransaction();

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function SignInWithCradentialsAction(
  params: Pick<AuthCradentialsParams, "email" | "password">,
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: SignInSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      throw new NotFoundError("User not found.");
    }

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!existingAccount) {
      throw new NotFoundError("Account not found.");
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingAccount.password!,
    );
    if (!isPasswordValid) {
      throw new Error("password is incorrect.");
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function signInGithubAction() {
  await signIn("github", {
    redirectTo: ROUTES.Home,
  });
}

export async function signInGoogleAction() {
  await signIn("google", {
    redirectTo: ROUTES.Home,
  });
}

export async function logOutAction() {
  await signOut({
    redirectTo: ROUTES.Home,
  });
}
