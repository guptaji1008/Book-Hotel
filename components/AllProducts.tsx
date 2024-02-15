"use client";

import Loading from "@/app/admin/loading";
import { IRoom } from "@/backend/models/room";
import { useDeleteRoomMutation } from "@/globalStore/api/roomApi";
import { revalidateTag } from "@/helper/revalidate";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaImages, FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface Props {
  data: {
    rooms: IRoom[];
  };
}

const AllProducts = ({ data }: Props) => {
  const rooms = data?.rooms;
  const [roomId, setRoomId] = useState("");

  const router = useRouter();

  const [deleteRoom, { error, isSuccess, isLoading }] = useDeleteRoomMutation();

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      revalidateTag("RoomDetails")
      router.refresh();
      toast.success("Room deleted successfully");
    }
  }, [error, isSuccess]);

  const deleteRoomHandler = (id: string) => {
    setRoomId(id);
    deleteRoom(id);
  };

  const setRooms = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: "Room ID",
          field: "roomId",
          sort: "asc",
        },
        {
          label: "Room Name",
          field: "roomName",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    rooms.forEach((room) =>
      data?.rows?.push({
        roomId: room?._id,
        roomName: room?.name,
        actions: (
          <>
            <Link
              href={`/admin/rooms/${room?._id}`}
              className="btn btn-sm btn-outline btn-primary"
            >
              <FaPencil />
            </Link>
            <Link
              href={`/admin/rooms/${room?._id}/upload_images`}
              className="btn btn-sm btn-outline-success ms-2"
            >
              <FaImages />
            </Link>
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => deleteRoomHandler(room?._id)}
              disabled={isLoading && roomId === room?._id}
            >
              <FaTrash />
            </button>
          </>
        ),
      })
    );
    return data;
  };

  if (!rooms) return <Loading />;

  return (
    <div>
      <div className="mb-5 d-flex justify-content-between align-items-center">
        <h2>All Rooms ({rooms?.length})</h2>
        <button
          className="text-white btn btn-danger"
          onClick={() => router.push("/admin/rooms/new")}
        >
          Create Room
        </button>
      </div>
      <MDBDataTable
        //@ts-ignore
        data={setRooms()}
        bordered
        striped
        hover
      />
    </div>
  );
};

export default AllProducts;
