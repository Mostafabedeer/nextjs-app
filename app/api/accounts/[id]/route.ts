import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

// Get api/accounts/:id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");
  try {
    // Connect to the database
    await dbConnect();
    // Find the user by ID
    const account = await Account.findById(id);
    if (!account) throw new NotFoundError("Account");

    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}

// Delete api/accounts/:id
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");
  try {
    // Connect to the database
    await dbConnect();
    // Find the account by ID and delete
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) throw new NotFoundError("account");

    return NextResponse.json(
      { success: true, data: deletedAccount },
      { status: 200 },
    );
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}

// Update api/accounts/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    // Connect to the database
    await dbConnect();
    // Parse the request body
    const body = await req.json();
    // validate the request body
    const validatedAccount = AccountSchema.partial().safeParse(body);

    if (!validatedAccount.success) {
      throw new ValidationError(validatedAccount.error.flatten().fieldErrors);
    }
    // Update the account by ID
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validatedAccount,
      {
        new: true,
      },
    );
    if (!updatedAccount) throw new NotFoundError("Account");

    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 },
    );
  } catch (error) {
    handleError(error, "api") as APIErrorResponse;
  }
}
