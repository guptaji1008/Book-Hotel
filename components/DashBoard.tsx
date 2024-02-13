"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesStats from "./SalesStats";
import SalesChart from "./SalesChart";
import { TopPerformingChart } from "./TopPerformingRoom";
import { useLazyGetSaleStatsQuery } from "@/globalStore/api/bookingApi";
import toast from "react-hot-toast";
import Loading from "@/app/admin/loading";

const DashBoard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [getSaleStats, { error, data, isLoading }] = useLazyGetSaleStatsQuery()

  useEffect(() => {
    if (error && 'data' in error) {
      //@ts-ignore
      toast.error(error?.data?.message)
    }
    if (startDate && endDate && !data) {
      getSaleStats({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      })
    }
  }, [error]);

  const handleSubmit = () => {
    getSaleStats({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    })
  }

  if (!data) return <Loading />

  return (
    <div className="ps-4 my-5">
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <button className="form-btn ms-4 mt-3 px-5 py-2" disabled={isLoading}  onClick={handleSubmit}>{isLoading ? <div className='lds-dual-ring'></div> : "Fetch"}</button>
      </div>
      <SalesStats data={data}/>
      <div className="row">
        <div className="col-12 col-lg-8">
          <h4 className="my-5 text-center">Sales History</h4>
          <SalesChart salesData={data?.lastSixMonthsData}/>
        </div>

        <div className="col-12 col-lg-4 text-center">
          <h4 className="my-5">Top Performing Rooms</h4>
          {data?.topPerformingRooms.length > 0  ? (
            <TopPerformingChart topRooms={data?.topPerformingRooms}/>
          ) : (
            <p className="mt-5">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
