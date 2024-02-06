import { NextRequest, NextResponse } from "next/server";
import { catchAsyncHandler } from "../middleware/catchAsyncErrors";
import User from "../models/user";
import ErrorHandler from "../utlis/errorHandlers";
import { delete_file, upload_file } from "../utlis/cloudinary";
import { emailTemplate } from "../utlis/emailTemplate";
import sendEmail from "../utlis/sendMailer";
import crypto from "crypto";

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

// Forgot password => /api/password/forgot
export const forgotPassword = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw new ErrorHandler("User not found", 404);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;

  const message = emailTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Book hotels password recovery",
      message,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    //@ts-ignore
    throw new ErrorHandler(error?.message, 500);
  }

  return NextResponse.json({
    success: true,
    user,
  });
});

// Forgot password => /api/password/reset/:token
export const resetPassword = catchAsyncHandler(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const body = await req.json();

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw new ErrorHandler("Token is invalid or expired", 404);
    }

    // Set the new password
    user.password = body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
    });
  }
);
