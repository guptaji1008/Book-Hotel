
"use client";

import { IRoom } from "@/backend/models/room";
import { useUpdateRoomMutation } from "@/globalStore/api/roomApi";
import { revalidateTag } from "@/helper/revalidate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
    data: {
        room: IRoom
    }
}

const UpdateRoom = ({ data }: Props) => {

  const room = data?.room;

  const [roomDetails, setRoomDetails] = useState({
    name: room?.name,
    description: room?.description,
    pricePerNight: room?.pricePerNight,
    address: room?.address,
    guestCapacity: room?.guestCapacity,
    numOfBeds: room?.numOfBeds,
    isInternet: room?.isInternet,
    isBreakfast: room?.isBreakfast,
    isAirConditioned: room?.isAirConditioned,
    isPetsAllowed: room?.isPetsAllowed,
    isRoomCleaning: room?.isRoomCleaning,
    category: room?.category,
  });

  const router = useRouter();

  const [updateRoom, { isLoading, error, isSuccess }] = useUpdateRoomMutation();

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      revalidateTag("RoomDetails");
      router.refresh();
      toast.success("Room Updated");
    }
  }, [isSuccess, error]);

  const {
    name,
    description,
    pricePerNight,
    address,
    guestCapacity,
    numOfBeds,
    isInternet,
    isBreakfast,
    isAirConditioned,
    isPetsAllowed,
    isRoomCleaning,
    category,
  } = roomDetails;

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomData = {
      name,
      description,
      pricePerNight,
      address,
      guestCapacity: Number(guestCapacity),
      numOfBeds: Number(numOfBeds),
      isInternet,
      isBreakfast,
      isAirConditioned,
      isPetsAllowed,
      isRoomCleaning,
      category,
    };

    updateRoom({body: roomData, id: room?._id});
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;

    setRoomDetails({
      ...roomDetails,
      [target.name]:
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked
          : target.value,
    });
  };

  const roomFeatures: { name: string; value: keyof typeof roomDetails }[] = [
    { name: "Internet", value: "isInternet" },
    { name: "Breakfast", value: "isBreakfast" },
    { name: "Air Conditioned", value: "isAirConditioned" },
    { name: "Pet Allowed", value: "isPetsAllowed" },
    { name: "Room Cleaning", value: "isRoomCleaning" },
  ];

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-12">
        <form className="shadow rounded bg-body" onSubmit={handleSumbit}>
          <h2 className="mb-4">Update Room</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price_field" className="form-label">
              Price
            </label>
            <input
              type="text"
              id="price_field"
              className="form-control"
              name="pricePerNight"
              value={pricePerNight}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description_field" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description_field"
              rows={8}
              name="description"
              value={description}
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="address_field" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address_field"
              className="form-control"
              name="address"
              value={address}
              onChange={onChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="room_type_field" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="room_type_field"
              name="category"
              value={category}
              onChange={onChange}
            >
              {["King", "Single", "Twins"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="row">
            <div className="mb-3 col">
              <label htmlFor="guest_field" className="form-label">
                Guest Capacity
              </label>
              <select
                className="form-select"
                id="guest_field"
                name="guestCapacity"
                value={guestCapacity}
                onChange={onChange}
              >
                {[1, 2, 3, 4, 5, 6].map((no) => (
                  <option value={no} key={no}>
                    {no}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3 col">
              <label htmlFor="numofbeds_field" className="form-label">
                Number of Beds
              </label>
              <select
                className="form-select"
                id="numofbeds_field"
                name="numOfBeds"
                value={numOfBeds}
                onChange={onChange}
              >
                {[1, 2, 3].map((no) => (
                  <option value={no} key={no}>
                    {no}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <label className="mb-3">Room Features</label>
          {/* <!-- Room Features (Add more options as needed) --> */}

          {roomFeatures.map((item, ind) => (
            <div className="form-check" key={ind}>
              <input
                className="form-check-input"
                type="checkbox"
                id={item?.value}
                name={item?.value}
                value={item?.value}
                onChange={onChange}
                checked={!!roomDetails[item?.value]}
              />
              <label className="form-check-label" htmlFor={item?.value}>
                {item?.name}
              </label>
            </div>
          ))}
          <button type="submit" className="form-btn w-100 py-2">
            {isLoading ? <div className="lds-dual-ring"></div> : "UPDATE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoom;
