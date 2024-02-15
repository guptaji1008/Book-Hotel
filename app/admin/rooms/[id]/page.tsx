import Error from '@/app/error';
import UpdateRoom from '@/components/UpdateRoom';
import { getAuthHeader } from '@/helper/getAuthHeader';
import React from 'react'

export const metadata = {
  title: "ADMIN - Update Room",
};

const getRoomData = async (id: string) => {
  const authHeader = getAuthHeader()
  const res = await fetch(`${process.env.API_URL}/api/rooms/${id}`, {
    headers: authHeader.headers,
  })
  return res.json()
}

const UpdateRoomPage = async ({ params } : { params: { id: string } }) => {
  const data = await getRoomData(params?.id)

  if (data?.message) {
    return <Error error={data}/>
  }

  return <UpdateRoom data={data}/>
}

export default UpdateRoomPage