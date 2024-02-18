import Error from '@/app/error';
import AllBookings from '@/components/AllBookings';
import { getAuthHeader } from '@/helper/getAuthHeader';
import React from 'react'

export const metadata = {
  title: "ADMIN - All Bookings",
};

const getAllBookings = async () => {
  const authHeader = getAuthHeader()
  const res = await fetch(`${process.env.API_URL}/api/admin/bookings`, authHeader)
  return res.json()
}

const AllAdminRoomsPage = async () => {
  const data = await getAllBookings()

  if (data?.message) {
    return <Error error={data}/>
  }

  return <AllBookings data={data}/>
}

export default AllAdminRoomsPage