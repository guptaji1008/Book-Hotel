"use client"

import { IBooking } from "@/backend/models/booking";
import { useDeleteBookingMutation } from "@/globalStore/api/bookingApi";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaReceipt, FaTrash } from "react-icons/fa";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const AllBookings = ({ data }: Props) => {
  const bookings = data?.bookings;
  const [bookingId, setBookingId] = useState("")

  const router = useRouter()

  const [deleteBooking, { error, isLoading, isSuccess }] = useDeleteBookingMutation()

  useEffect(() => {
    if (error && 'data' in error) {
        //@ts-ignore
        toast.error(error?.data?.message)
    }
    if (isSuccess) {
        router.refresh()
        toast.success("Booking deleted")
    }
  }, [isSuccess, error])

  const deleteBookingHandler = (id: string) => {
    setBookingId(id);
    deleteBooking(id)
  }

  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
            label: "ID",
            field: "id",
            sort: "asc",
        },
        {
            label: "Check In",
            field: "checkin",
            sort: "asc",
        },
        {
            label: "Check Out",
            field: "checkout",
            sort: "asc",
        },
        {
            label: "Actions",
            field: "actions",
            sort: "asc",
        },
      ],
      rows: [],
    };

    bookings.forEach((booking) => (
        data?.rows?.push({
            id: booking._id,
            checkin: new Date(booking?.checkInDate).toLocaleString("en-US"),
            checkout: new Date(booking?.checkOutDate).toLocaleString("en-US"),
            actions: (
                <>
                    <Link href={`/bookings/${booking._id}`} className="btn btn-sm btn-outline btn-primary">
                        <FaEye />
                    </Link>
                    <Link href={`/bookings/invoice/${booking._id}`} className="btn btn-sm btn-outline-success ms-2">
                        <FaReceipt />
                    </Link>
                    <button className="btn btn-sm btn-outline-danger ms-2"
                    onClick={() => deleteBookingHandler(booking?._id)}
                    disabled={isLoading && bookingId === booking?._id}
                    >
                        <FaTrash />
                    </button>
                </>
            )
        })
    ))
    return data;
  };

  return <div>
    <h2 className="mb-5">{data?.bookings?.length} Bookings</h2>
    <MDBDataTable 
    //@ts-ignore
    data={setBookings()}
    bordered
    striped
    hover
    />
  </div>;
};

export default AllBookings;

