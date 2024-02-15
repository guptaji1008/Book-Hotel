import Error from '@/app/error';
import AllProducts from '@/components/AllProducts';
import { getAuthHeader } from '@/helper/getAuthHeader';
import React from 'react'

export const metadata = {
  title: "ADMIN - All Rooms",
};

const getRoomsData = async () => {
  const authHeader = getAuthHeader()
  const res = await fetch(`${process.env.API_URL}/api/admin/rooms`, {
    headers: authHeader.headers,
  })
  return res.json()
}

const AllAdminRoomsPage = async () => {
  const data = await getRoomsData()

  if (data?.message) {
    return <Error error={data}/>
  }

  return <AllProducts data={data}/>
}

export default AllAdminRoomsPage