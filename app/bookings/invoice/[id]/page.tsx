import Error from '@/app/error'
import Invoice from '@/components/invoice/Invoice'
import { getAuthHeader } from '@/helper/getAuthHeader'

export const metadata = {
    title: "Booking Invoice"
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

  return <Invoice data={data}/>
}

export default page