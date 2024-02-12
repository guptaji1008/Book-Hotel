import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    newBooking: builder.mutation({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
    checkBookingAvailibility: builder.query({
      query: ({ roomId, checkInDate, checkOutDate }) => ({
        url: `/booking/check_booking_availability?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
      }),
    }),
    getBookedDates: builder.query({
      query: (roomId) => ({
        url: `/booking/get_booked_dates?roomId=${roomId}`,
      }),
    }),
    stripeCheckout: builder.query({
      query: ({ id, checkOutData }) => ({
        url: `/payment/checkout_session/${id}`,
        params: {
          checkInDate: checkOutData.checkInDate,
          checkOutDate: checkOutData.checkOutDate,
          daysOfStay: checkOutData.daysOfStay,
          amount: checkOutData.amount,
        }
      }),
    }),
  }),
});

export const {
  useNewBookingMutation,
  useLazyCheckBookingAvailibilityQuery,
  useGetBookedDatesQuery,
  useLazyStripeCheckoutQuery,
} = bookingApi;