import { IRoom } from "@/backend/models/room";
import { useGetBookedDatesQuery, useLazyCheckBookingAvailibilityQuery, useLazyStripeCheckoutQuery, useNewBookingMutation } from "@/globalStore/api/bookingApi";
import { useAppSelector } from "@/globalStore/hooks";
import { calculateNoOfDays } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const BookingDatePicker = ({ room }: { room: IRoom }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [noOfDays, setNoOfDays] = useState(0);

  const { isAuth } = useAppSelector((state) => state.user)
  const router = useRouter()

  const [newBooking, { isLoading, isSuccess, error }] = useNewBookingMutation();
  const [checkBookingAvailability, { data }] = useLazyCheckBookingAvailibilityQuery();
  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(room?._id)

  const excludesDates = dates?.map((date: string) => new Date(date)) || [];

  const isAvailable = data?.isAvailable;

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateNoOfDays(checkInDate, checkOutDate);
      setNoOfDays(days);
      // check booking availability
      checkBookingAvailability({
        roomId: room._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      })
    }
  };

  useEffect(() => {
    if (error && "data" in error) {
      //@ts-ignore
      toast.error(error?.data?.message)
    }
    if (isSuccess) {
      toast.success("Booked successfully")
    }
  }, [error, isSuccess])

  const [stripeCheckout, { error: stripeError, isLoading: stripeIsLoading, data: stripeData }] = useLazyStripeCheckoutQuery()

  // const handlePayButton = () => {
  //   newBooking({
  //     room: room._id,
  //     checkInDate,
  //     checkOutDate,
  //     daysOfStay: noOfDays,
  //     amountPaid: room?.pricePerNight * noOfDays,
  //     paymentInfo: {
  //       id: "STRIP_ID",
  //       status: "paid",
  //     },
  //   });
  // };

  useEffect(() => {
    if (stripeError && 'data' in stripeError) {
      //@ts-ignore
      toast.error(stripeError?.data?.message)
    }
    if (stripeData) {
      console.log(stripeData)
      router.replace(stripeData?.url)
    }
  }, [stripeError, stripeData])

  const handlePayButton = () => {
    const amount = room.pricePerNight * noOfDays;

    const checkOutData = {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      daysOfStay: noOfDays,
      amount
    }

    stripeCheckout({ id: room?._id, checkOutData })
  }

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>${room?.pricePerNight}</b> / night
      </p>
      <hr />
      <h5 className="mt-5 mb-3">Pick check in and check out date</h5>
      <DatePicker
        className="w-100"
        //@ts-ignore
        onChange={onChange}
        selected={checkInDate}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        excludeDates={excludesDates}
        selectsRange
        inline
      />
      {
        isAvailable!== undefined && isAvailable === true && <div className="alert alert-success py-3">
          Room is available, book now.
        </div>
      }
      {
        isAvailable!== undefined && isAvailable === true && !isAuth && <div className="alert alert-danger py-3">
          Login to book the room.
        </div>
      }
      {
        isAvailable !== undefined && isAvailable === false && <div className="alert alert-danger py-3">
          Room not available, try again.
        </div>
      }
      {
        isAuth && <button className="form-btn w-100 py-3" onClick={handlePayButton} disabled={(isAvailable !== undefined && isAvailable === false) || isLoading || stripeIsLoading}>
        {
          isLoading || stripeIsLoading ? <div className='lds-dual-ring'></div> : "Pay"
        }
      </button>
      }
    </div>
  );
};

export default BookingDatePicker;
