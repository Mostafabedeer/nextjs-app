import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

// Get api/users/:id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");
  try {
    // Connect to the database
    await dbConnect();
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}

// Delete api/users/:id
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");
  try {
    // Connect to the database
    await dbConnect();
    // Find the user by ID and delete
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: deletedUser },
      { status: 200 },
    );
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}

// Update api/users/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");

  try {
    // Connect to the database
    await dbConnect();
    // Parse the request body
    const body = await req.json();
    // validate the request body
    const validatedUser = UserSchema.partial().parse(body);
    // Update the user by ID
    const updatedUser = await User.findByIdAndUpdate(id, validatedUser, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}
