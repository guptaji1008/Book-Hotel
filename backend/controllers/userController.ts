import { NextRequest, NextResponse } from "next/server";
import { catchAsyncHandler } from "../middleware/catchAsyncErrors";
import User from "../models/user";
import ErrorHandler from "../utlis/errorHandlers";
import { delete_file, upload_file } from "../utlis/cloudinary";

// Register user => /api/auth/register
export const registerUser = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { name, email, password } = body;

  const user = await User.find({ email });
  if (user.length) {
    throw new ErrorHandler("User already exists", 400);
  }

  await User.create({
    name,
    email,
    password,
  });

  return NextResponse.json({
    success: true,
  });
});

// update user profile => /api/me/update
export const updateProfile = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  const userData = {
    name: body.name,
    email: body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, userData);

  return NextResponse.json({
    success: true,
    user,
  });
});

// update password => /api/me/update_password
export const updatePassword = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findById(req?.user?._id).select("+password");

  const isMatched = await user.comparePassword(body.oldPassword);
  if (!isMatched) {
    throw new ErrorHandler("Old password is incorrect", 400);
  }

  user.password = body.newPassword;
  await user.save();

  return NextResponse.json({
    success: true,
  });
});

// update avatar => /api/me/update_avatar
export const updateAvatar = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  // Remove previous avatar if exists
  if (req?.user?.avatar?.public_id) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const avatarResponse = await upload_file(body?.avatar, "Book hotels/avatars");

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  return NextResponse.json({
    success: true,
    user,
  });
});
