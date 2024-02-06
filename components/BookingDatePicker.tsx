import { IRoom } from "@/backend/models/room";
import { useGetBookedDatesQuery, useLazyCheckBookingAvailibilityQuery, useNewBookingMutation } from "@/globalStore/api/bookingApi";
import { calculateNoOfDays } from "@/helper/helper";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const BookingDatePicker = ({ room }: { room: IRoom }) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [noOfDays, setNoOfDays] = useState(0);

  const [newBooking, { isLoading, isSuccess, error }] = useNewBookingMutation();
  const [checkBookingAvailability, { data }] = useLazyCheckBookingAvailibilityQuery();
  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(room?._id)

  const excludesDates = dates?.map((date: string) => new Date(date)) || [];

  const isAvailable = data?.isAvailable;
  console.log(data)

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

  const handlePayButton = () => {
    newBooking({
      room: room._id,
      checkInDate,
      checkOutDate,
      daysOfStay: noOfDays,
      amountPaid: room?.pricePerNight * noOfDays,
      paymentInfo: {
        id: "STRIP_ID",
        status: "paid",
      },
    });
  };

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
        isAvailable !== undefined && isAvailable === false && <div className="alert alert-danger py-3">
          Room not available, try again.
        </div>
      }
      <button className="form-btn w-100 py-3" onClick={handlePayButton} disabled={(isAvailable !== undefined && isAvailable === false) || isLoading}>
        {
          isLoading ? <div className='lds-dual-ring'></div> : "Pay"
        }
      </button>
    </div>
  );
};

export default BookingDatePicker;
