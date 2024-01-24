import { NextRequest, NextResponse } from "next/server";
import { catchAsyncHandler } from "../middleware/catchAsyncErrors";
import User from '../models/user'
import ErrorHandler from "../utlis/errorHandlers";

// Register user => /api/auth/register
export const registerUser = catchAsyncHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { name, email, password } = body;

    const user = await User.find({ email })
    if (user.length) {
        throw new ErrorHandler("User already exists", 400)
    }

    await User.create({
        name, email, password,
    });

    return NextResponse.json({
        success: true
    })
})