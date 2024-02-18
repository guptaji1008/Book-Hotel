"use client";

import { IReview } from "@/backend/models/room";
import {
  useDeleteReviewMutation,
  useLazyAllSingleRoomReviewsQuery,
} from "@/globalStore/api/roomApi";
import { revalidateTag } from "@/helper/revalidate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import StarRatings from "react-star-ratings";

const AllRoomReviews = () => {
  const [roomId, setRoomId] = useState("");
  const [reviewList, setReviewList] = useState([]);

  const router = useRouter()

  const [getSingleRoomReviews, { error, isLoading, data }] =
    useLazyAllSingleRoomReviewsQuery();

  const [
    deleteReview,
    { isLoading: isDeleting, error: deleteError, data: abc, isSuccess: isDeleted },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
    }
    if (isDeleted) {
      revalidateTag("RoomDetails")
      router.refresh()
      toast.success("Review deleted")
    }
  }, [deleteError, isDeleted]);

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
    }
    if (data) {
      setReviewList(data?.reviews);
    }
  }, [error, data]);

  const handleDeleteButton = (roomId: string, id: string) => {
    console.log("aman")
    deleteReview({ roomId, id });
  };

  const handleSubmit = () => {
    if (!roomId) {
      toast.error("Please provide room Id");
    }
    getSingleRoomReviews(roomId);
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-12 col-10">
          <div className="form-check">
            <label htmlFor="roomId_field">
              <b>Enter Room ID</b>
            </label>
            <input
              type="text"
              id="roomId_field"
              className="form-control"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />

            <button className="form-btn w-100 py-2 mt-3" onClick={handleSubmit}>
              {!isLoading ? (
                "Fetch Images"
              ) : (
                <div className="lds-dual-ring"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {reviewList.length > 0 ? (
        <ReviewItem
          roomId={roomId}
          reviews={reviewList}
          onClick={handleDeleteButton}
          isLoading={isDeleting}
        />
      ) : (
        <h5 className="mt-5 text-center">No Reviews</h5>
      )}
    </div>
  );
};

export default AllRoomReviews;

interface Props {
  reviews: IReview[];
  onClick: any;
  roomId: string;
  isLoading: boolean;
}

const ReviewItem = ({ reviews, onClick, roomId, isLoading }: Props) => {

  const [idNo, setIdNo] = useState("")

  const handleDelete = (roomId: string, id: string) => {
    setIdNo(id)
    onClick(roomId, id)
  }

  return (
    <div className="reviews w-100 my-5">
      <h3>{reviews?.length} Reviews</h3>
      <hr />
      {/* <!-- Individual Reviews go here --> */}
      {reviews?.map((review) => (
        <>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger"
              onClick={() => handleDelete(roomId, review?._id)}
              disabled={isLoading && review?._id.toString() === idNo}
            >
              <FaTrash />
            </button>
          </div>
          <div className="review-card my-1">
            {/* <!-- Review Content goes here --> */}
            <div className="row">
              <div className="col-2 col-lg-1">
                <img
                  src={
                    review?.user?.avatar
                      ? review?.user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt={review?.user?.name}
                  width={60}
                  height={60}
                  className="rounded-circle"
                />
              </div>
              <div className="col-10 col-lg-11">
                <StarRatings
                  rating={review.rating}
                  starRatedColor="#e61e4d"
                  numberOfStars={5}
                  starDimension="25px"
                  starSpacing="1px"
                  name="rating"
                />
                <p>by {review?.user?.name}</p>
                <h5>{review?.comment}</h5>
              </div>
              <hr />
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
