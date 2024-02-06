import { NextRequest, NextResponse } from "next/server";
import { catchAsyncHandler } from "../middleware/catchAsyncErrors";
import Booking, { IBooking } from "../models/booking";
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import ErrorHandler from "../utlis/errorHandlers";

// @ts-ignore
const moment = extendMoment(Moment)

// new booking => /api/booking
export const newBooking = catchAsyncHandler(async (req: NextRequest) => {
    const body = await req.json();

    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
    } = body;

    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    })

    return NextResponse.json({
        booking
    })
})

// Check Room Booking Availibility => /api/booking/check
export const checkRoomBookingAvailibility = catchAsyncHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const roomId = searchParams.get("roomId");

    const checkInDate: Date = new Date(searchParams.get("checkInDate") as string);
    const checkOutDate: Date = new Date(searchParams.get("checkOutDate") as string);

    const bookings: IBooking[] = await Booking.find({
        room: roomId,
        $and: [
            { checkInDate: { $lte: checkOutDate } },
            { checkOutDate: { $gte: checkInDate } },
        ]
    })

    const isAvailable: boolean = bookings.length === 0;

    return NextResponse.json({
        isAvailable 
    })
})

// Get room booked dates => /api/booking/get_booked_dates
export const getRoomBookedDates = catchAsyncHandler(async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const roomId = searchParams.get("roomId");

    const bookings = await Booking.find({ room: roomId })

    const bookedDates = bookings.flatMap((booking) => Array.from(
        moment.range(moment(booking.checkInDate), moment(booking.checkOutDate)).by("day")
    ))

    return NextResponse.json({
        bookedDates 
    })
})

// Get current user booking => /api/booking/me
export const myBookings = catchAsyncHandler(async (req: NextRequest) => {
    const bookings = await Booking.find({ user: req.user._id })

    return NextResponse.json({
        bookings 
    })
})

// Get current user booking => /api/booking/:id
export const bookingDetails = catchAsyncHandler(async (req: NextRequest, {params}:  {params: { id: string } }) => {
    const booking = await Booking.findById(params.id).populate('user room')

    if (booking.user?._id?.toString() !== req.user._id) {
        throw new ErrorHandler("You cannot view this booking", 403)
    }

    return NextResponse.json({
        booking
    })
})