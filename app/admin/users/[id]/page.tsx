import Error from '@/app/error';
import UpdateUserDetails from '@/components/UpdateUserDetails';
import { getAuthHeader } from '@/helper/getAuthHeader';
import React from 'react'

export const metadata = {
  title: "ADMIN - Update User",
};

const getUserDetails = async (id: string) => {
  const authHeader = getAuthHeader()
  const res = await fetch(`${process.env.API_URL}/api/admin/users/${id}`, authHeader)
  return res.json()
}

const UpdateUserPage = async ({ params }: { params: { id: string } }) => {
  const data = await getUserDetails(params?.id)

  if (data?.message) {
    return <Error error={data}/>
  }

  return <UpdateUserDetails data={data}/>
}

export default UpdateUserPage