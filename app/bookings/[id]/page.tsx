import Error from '@/app/error'
import BookingDetails from '@/components/BookingDetails'
import { getAuthHeader } from '@/helper/getAuthHeader'

export const metadata = {
    title: "Details"
}

const bookingDetail = async (id: string) => {

  const cookieHeader = getAuthHeader()

    const res = await fetch(`${process.env.API_URL}/api/booking/${id}`, cookieHeader)
    return res.json();
}

const page = async ({ params }: { params: { id: string } }) => {

  const data = await bookingDetail(params?.id);

  if (data?.message) {
    return <Error error={data}/>
  }

  return <BookingDetails data={data}/>
}

export default page
