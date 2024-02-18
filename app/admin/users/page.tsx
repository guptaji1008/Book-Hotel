import Error from '@/app/error';
import AllUsers from '@/components/AllUsers';
import { getAuthHeader } from '@/helper/getAuthHeader';
import React from 'react'

export const metadata = {
  title: "ADMIN - All Users",
};

const getUsersData = async () => {
  const authHeader = getAuthHeader()
  const res = await fetch(`${process.env.API_URL}/api/admin/users`, authHeader)
  return res.json()
}

const AllAdminUsersPage = async () => {
  const data = await getUsersData()

  if (data?.message) {
    return <Error error={data}/>
  }

  return <AllUsers data={data}/>
}

export default AllAdminUsersPage