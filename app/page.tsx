import Home from '@/components/Home'
import React from 'react'
import Error from './error'

export const metadata = {
  title: "Home Page - Book Hotels",
};

const getRoomsData = async (searchParams: string) => {
  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString()
  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, { cache: "no-cache" })
  return res.json()
}

const HomePage = async ({ searchParams }: { searchParams: string; }) => {
  const data = await getRoomsData(searchParams)

  if (data?.message) {
    return <Error error={data}/>
  }

  return <Home data={data}/>
}

export default HomePage

