import { NextRequest, NextResponse } from "next/server";
import Room, { IReview, IRoom } from "../models/room";
import { catchAsyncHandler } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utlis/errorHandlers";
import APIFilters from "../utlis/apiFilter";
import Booking from "../models/booking";

// Get all the rooms details => /api/room
export const allRooms = catchAsyncHandler(async (req: NextRequest) => {
  const resPerPage = 4;

  const { searchParams } = new URL(req.url);

  const queryStr: any = {};

  searchParams.forEach((value, key) => {
    queryStr[key] = value;
  });

  const apiFilters = new APIFilters(Room, queryStr).search().filter();

  let rooms: IRoom[] = await apiFilters.query;
  const filteredRoomsCount: number = rooms.length;

  apiFilters.pagination(resPerPage);
  rooms = await apiFilters.query.clone();

  return NextResponse.json({
    success: true,
    filteredRoomsCount,
    resPerPage,
    rooms,
  });
});

// Create new room => /api/admin/rooms
export const newRoom = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();
  const room = await Room.create(body);
  return NextResponse.json({
    success: true,
    room,
  });
});

// get single room details => /api/room/:id
export const getRoomDetails = catchAsyncHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const room = await Room.findById(params.id).populate('review.user');
    if (!room) {
      throw new ErrorHandler("Room not found!", 404);
    }
    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// update single room details => /api/admin/room/:id
export const updateRoomDetails = catchAsyncHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    let room = await Room.findById(params.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found!", 404);
    }

    room = await Room.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      room,
    });
  }
);

// update single room details => /api/admin/room/:id
export const deleteRoom = catchAsyncHandler(
  async (
    req: NextRequest,
    {
      params,
    }: {
      params: { id: string };
    }
  ) => {
    const room = await Room.findById(params.id);

    if (!room) {
      throw new ErrorHandler("Room not found!", 404);
    }

    // TODO - Delete image associated to the room

    await room.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);

// Create/Update the review of room => /api/reviews
export const createRoomReview = catchAsyncHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { rating, comment, roomId } = body;

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment,
  };

  const room = await Room.findById(roomId);

  const isReviewed = room?.review?.find(
    (r: IReview) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    room?.review?.forEach((review: IReview) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    room.review.push(review);
    room.numOfReviews = room.review.length;
  }

  room.ratings = room?.review?.reduce(
    (acc: number, item: { rating: number }) => item.rating + acc,
    0
  ) / room?.review?.length;

  await room.save();

  return NextResponse.json({ success: true });
});

// Can user review room  => /api/reviews/can_review
export const canReview = catchAsyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const bookings = await Booking.find({ user: req?.user?._id, room: roomId })
  
  const canReview = bookings?.length > 0 ? true : false;
  return NextResponse.json({ canReview });
})
