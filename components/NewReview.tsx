import { useCanUserReviewQuery, usePostReviewMutation } from "@/globalStore/api/roomApi";
import { revalidateTag } from "@/helper/revalidate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

const NewReview = ({ roomId }: { roomId: string }) => {
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState("");
  const router = useRouter();

  const { data: { canReview } = {} } = useCanUserReviewQuery(roomId)
  const [postReview, { error, isSuccess }] = usePostReviewMutation();

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
      console.log(error?.data)
    }
    if (isSuccess) {
      revalidateTag("RoomDetails")
      toast.success("Review Posted");
      router.refresh();
    }
  }, [error, isSuccess]);

  const handleSubmit = () => {
    const reviewData = {
      rating,
      comment,
      roomId,
    };
    postReview(reviewData);
  };

  return (
    <>
      {
        canReview && <button
        type="button"
        className="form-btn mt-4 mb-5"
        data-bs-toggle="modal"
        data-bs-target="#ratingModal"
      >
        Submit Your Review
      </button>
      }
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {/* <!-- Review Modal content goes here --> */}
            <div className="modal-header">
              <h5 className="modal-title" id="ratingModalLabel">
                Submit Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <!-- Placeholder for Review Content --> */}
              <StarRatings
                rating={rating}
                starRatedColor="#e61e4d"
                numberOfStars={5}
                name="rating"
                changeRating={(e: any) => setRating(e)}
              />
              <div className="form-floating">
                <textarea
                  id="review_field"
                  placeholder="Leave your comment"
                  className="form-control mt-4"
                  style={{ height: "100px" }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="my-3 form-btn w-100"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReview;
