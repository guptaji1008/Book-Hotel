"use client";

import { IImage, IRoom } from "@/backend/models/room";
import { useDeleteRoomImageMutation, useUploadRoomImagesMutation } from "@/globalStore/api/roomApi";
import { revalidateTag } from "@/helper/revalidate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes, FaTrash } from "react-icons/fa";

interface Props {
  data: {
    room: IRoom;
  };
}

const UploadRoomImages = ({ data }: Props) => {

  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<IImage[]>([]);

  const inputFileRef = useRef<HTMLInputElement>(null)
  const router = useRouter();

  const [uploadRoomImages, { isLoading, error, isSuccess }] =
    useUploadRoomImagesMutation();

  const [deleteImage, { isLoading: isDeleting, error: deleteError, isSuccess: deleteSuccess }] = useDeleteRoomImageMutation()

  useEffect(() => {
    if (data) {
      setUploadedImages(data?.room?.images)
    }
  }, [data])

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      revalidateTag("RoomDetails");
      setImagesPreview([]);
      router.refresh();
      toast.success("Image Uploaded");
    }
  }, [error, isSuccess, router]);

  useEffect(() => {
    if (deleteError && "data" in deleteError) {
      //@ts-ignore
      toast.error(deleteError?.data?.message);
    }
    if (deleteSuccess) {
      revalidateTag("RoomDetails");
      setImagesPreview([]);
      router.refresh();
      toast.success("Image Deleted");
    }
  }, [deleteError, deleteSuccess, router]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    setImages([]);
    setImagesPreview([]);

    files.map((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArr) => [...oldArr, reader.result as string]);
          setImagesPreview((oldArr) => [...oldArr, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadRoomImages({ id: data?.room?._id, body: { images } });
  };

  const removeImagePreview = (imgUrl: string) => {
    const filteredImagePreview = imagesPreview.filter((img) => img !== imgUrl);
    setImagesPreview(filteredImagePreview)
    setImages(filteredImagePreview)
  }

  const handleResetFileInput = () => {
    if (inputFileRef.current) {
        inputFileRef.current.value = ""
    }
  }

  const handleImageDelete = (imgId: string) => {
    deleteImage({ id: data?.room?._id, body: { imgId } });
  }

  return (
    <div>
      <div className="row wrapper">
        <div className="col-10 col-lg-12 mt-5 mt-lg-0">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Upload Room Images</h2>

            <div className="form-group">
              <label htmlFor="customFile" className="form-label">
                Choose Images
              </label>

              <div className="custom-file">
                <input
                  ref={inputFileRef}
                  type="file"
                  name="product_images"
                  className="form-control"
                  id="customFile"
                  onChange={onChange}
                  multiple
                  required
                  onClick={handleResetFileInput}
                />
              </div>

              {imagesPreview.length > 0 && (
                <div className="new-images mt-4">
                  <p className="text-warning">New Images:</p>
                  <div className="row mt-4">
                    {/* <!-- Example of a single image preview, you can repeat this structure for multiple images --> */}
                    {imagesPreview.map((image, ind) => (
                      <div className="col-md-3 mt-2" key={ind}>
                        <div className="card">
                          <Image
                            src={image}
                            alt="image preview"
                            className="card-img-top p-2"
                            width={100}
                            height={80}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            type="button"
                            className="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => removeImagePreview(image)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* <!-- Repeat this structure for each new image --> */}
                  </div>
                </div>
              )}

              {uploadedImages.length > 0 && (
                <div className="uploaded-images mt-4">
                  <p className="text-success">Room Uploaded Images:</p>
                  <div className="row mt-1">
                    {/* <!-- Example of a single uploaded image, you can repeat this structure for multiple images --> */}
                    {uploadedImages.map((image, ind) => (
                      <div className="col-md-3 mt-2" key={ind}>
                        <div className="card">
                          <Image
                            src={image?.url}
                            alt={image?.url}
                            className="card-img-top p-2"
                            width={100}
                            height={80}
                          />
                          <button
                            style={{
                              backgroundColor: "#dc3545",
                              borderColor: "#dc3545",
                            }}
                            className="btn btn-block btn-danger cross-button mt-1 py-1"
                            disabled={isDeleting || isLoading}
                            onClick={() => handleImageDelete(image?.public_id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* <!-- Repeat this structure for each uploaded image --> */}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              className="form-btn w-100 py-2"
              disabled={isLoading}
            >
              { isLoading ? <div className="lds-dual-ring"></div> : "Upload" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadRoomImages;
