import { NextRequest, NextResponse } from "next/server";
import Room, { IImage, IReview, IRoom } from "../models/room";
import { catchAsyncHandler } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utlis/errorHandlers";
import APIFilters from "../utlis/apiFilter";
import Booking from "../models/booking";
import { delete_file, upload_file } from "../utlis/cloudinary";
import mongoose from "mongoose";

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

  body.user = req?.user?._id;

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
    const room = await Room.findById(params.id).populate("review.user");
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

// Upload room images => /api/admin/rooms/:id/upload_images
export const uploadRoomImage = catchAsyncHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params?.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    const uploader = async (image: string) =>
      upload_file(image, "Book hotels/rooms");

    const urls = await Promise.all((body?.images).map(uploader));

    room?.images?.push(...urls);

    await room.save();

    return NextResponse.json({
      success: true,
    });
  }
);

// Delete room image => /api/admin/rooms/:id/delete_image
export const deleteRoomImage = catchAsyncHandler(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const room = await Room.findById(params?.id);
    const body = await req.json();

    if (!room) {
      throw new ErrorHandler("Room not found", 404);
    }

    const isDeleted = await delete_file(body?.imgId);

    if (isDeleted) {
      room.images = room?.images.filter(
        (image: IImage) => image?.public_id !== body?.imgId
      );
    }

    await room.save();

    return NextResponse.json({
      success: true,
    });
  }
);

// Delete room => /api/admin/room/:id
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

    for (let i = 0; i < room?.images?.length; i++) {
      await delete_file(room?.images[i].public_id);
    }

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
    user: req?.user?._id,
    rating: Number(rating),
    comment,
  };

  // console.log(review)

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

  room.ratings =
    room?.review?.reduce(
      (acc: number, item: { rating: number }) => item.rating + acc,
      0
    ) / room?.review?.length;

  console.log(room);
  await room.save();

  return NextResponse.json({ success: true });
});

// Can user review room  => /api/reviews/can_review
export const canReview = catchAsyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const bookings = await Booking.find({ user: req?.user?._id, room: roomId });

  const canReview = bookings?.length > 0 ? true : false;
  return NextResponse.json({ canReview });
});

// Get all rooms  => /api/admin/rooms
export const allAdminRooms = catchAsyncHandler(async (req: NextRequest) => {
  const rooms = await Room.find();
  return NextResponse.json({ rooms });
});

// Get all rooms  => /api/admin/rooms/reviews
export const allRoomReviews = catchAsyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const room = await Room.findById(searchParams.get("roomId")).populate(
    "review.user"
  );
  if (!room) {
    throw new ErrorHandler("Room not found", 404);
  }

  return NextResponse.json({
    reviews: room?.review,
  });
});

// Delete room review  => /api/admin/rooms/reviews
export const deleteReview = catchAsyncHandler(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const roomId = searchParams.get("roomId");
  const id = searchParams.get("id");

  const room = await Room.findById(roomId);
  if (!room) {
    throw new ErrorHandler("Room not found", 404);
  }

  const review = (room?.review).filter(
    (review: IReview) => review?._id.toString() !== id );

  const numOfReviews = review.length;

  const ratings = numOfReviews === 0 ? 0 : (room?.review?.reduce(
    (acc: number, item: { rating: number }) => item.rating + acc,
    0
  ) / numOfReviews);

  await Room.findByIdAndUpdate(roomId, { review, numOfReviews, ratings });

  return NextResponse.json({
    success: true,
  });
});
