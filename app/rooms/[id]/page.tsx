import React from "react";
import Error from "@/app/error";
import RoomDetails from "@/components/RoomDetails";

const getRoomsData = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {cache: "no-cache"});
  return res.json();
};

const RoomDetailsPage = async ({ params }: { params: { id: string } }) => {
  const data = await getRoomsData(params?.id);

  if (data?.message) {
    return <Error error={data} />;
  }
  return <RoomDetails roomDetails={data?.room} />;
};

export default RoomDetailsPage;

export async function generateMetadata({params}: { params: { id: string } }) {
    const data = await getRoomsData(params?.id)

    return {
        title: data?.room?.name
    }

}
