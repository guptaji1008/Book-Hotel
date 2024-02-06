import Error from '@/app/error'
import MyBookings from '@/components/MyBookings'
import { getAuthHeader } from '@/helper/getAuthHeader'

export const metadata = {
  title: "My Bookings"
}

const getBookings = async () => {

  const cookieHeader = getAuthHeader()

    const res = await fetch(`${process.env.API_URL}/api/booking/me`, cookieHeader)
    return res.json();
}

const page = async () => {

  const data = await getBookings();

  if (data?.message) {
    return <Error error={data}/>
  }

  return <MyBookings data={data}/>
}

export default page
