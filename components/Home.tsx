"use client"

import { IRoom } from "@/backend/models/room";
import HomeItems from "./HomeItems"
import CustomPagination from "./CustomPagination";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface RoomsProp {
  data: {
    success: boolean;
    resPerPage: number;
    filteredRoomsCount: number;
    rooms: IRoom[]
  }
}

const Home = ({ data }: RoomsProp) => {

  const searchParams = useSearchParams()
  const location = searchParams.get("location")

  const { rooms, resPerPage, filteredRoomsCount } = data;

  return (
    <div>
      <section id="rooms" className="container mt-5">
        <h2 className="mb-3 ml-2 stays-heading">{location ? `${filteredRoomsCount} ${filteredRoomsCount === 1 ? "Room" : "Rooms"} found` : "All Rooms"}</h2>
        <Link href="/search" className="ml-2 back-to-search">
          <i className="fa fa-arrow-left"></i> Back to Search
        </Link>
        <div className="row mt-4">
          {
            rooms?.length === 0 ? (
              <div className="alert alert-danger mt-5 w-100">
                <b>No Rooms.</b>
              </div>
            ) : (
              rooms?.map((room) => <HomeItems key={room.id} room={room}/>)
            )
          }
        </div>
      </section>
      <CustomPagination resPerPage={resPerPage} filteredRoomsCount={filteredRoomsCount}/>
    </div>
  )
}

export default Home
