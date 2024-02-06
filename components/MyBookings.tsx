"use client"

import { IBooking } from "@/backend/models/booking";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { FaEye, FaReceipt } from "react-icons/fa";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const MyBookings = ({ data }: Props) => {
  const bookings = data?.bookings;

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
            label: "Amount Paid",
            field: "amountpaid",
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
            amountpaid: `$${booking?.amountPaid}`,
            actions: (
                <>
                    <Link href={`/bookings/${booking._id}`} className="btn btn-primary">
                        <FaEye />
                    </Link>
                    <Link href={`/bookings/invoice/${booking._id}`} className="btn btn-success ms-2">
                        <FaReceipt />
                    </Link>
                </>
            )
        })
    ))
    return data;
  };

  return <div className="container">
    <h1 className="my-5">MyBookings</h1>
    <MDBDataTable 
    //@ts-ignore
    data={setBookings()}
    className="px-5"
    bordered
    striped
    hover
    />
  </div>;
};

export default MyBookings;
