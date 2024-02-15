import Error from '@/app/error';
import UploadRoomImages from '@/components/UploadRoomImages';
import React from 'react'

export const metadata = {
  title: "ADMIN - Upload Room Images",
};

const getRoomData = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    next: {
      tags: ["RoomDetails"]
    }
  })
  return res.json()
}

const UploadRoomImagesPage = async ({ params } : { params: { id: string } }) => {
  const data = await getRoomData(params?.id)

  if (data?.message) {
    return <Error error={data}/>
  }

  return <UploadRoomImages data={data}/>
}

export default UploadRoomImagesPage