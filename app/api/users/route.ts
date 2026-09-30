import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    // Frontend validation
    const body = await req.json();
    const validatedData = UserSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const { username, email } = validatedData.data;

    // Backend validation
    const existingEmail = await User.findOne({ email });
    if (existingEmail) throw new Error("Email already exists");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username already exists");

    // Create new user
    const newUser = await User.create(validatedData.data);

    // Return success response
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
