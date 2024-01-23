"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [location, setLocation] = useState("");
  const [guest, setGuest] = useState("1");
  const [roomType, setRoomType] = useState("King");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryString = [
        location && `location=${encodeURIComponent(location)}`,
        guest && `guestCapacity=${encodeURIComponent(guest)}`,
        roomType && `category=${encodeURIComponent(roomType)}`,
    ].filter(Boolean).join("&");
    console.log(queryString)
    router.push(`/?${queryString}`);
  };

  return (
    <div className="row wrapper mt-5">
      <div className="col-10 col-lg-5">
        <form
          onSubmit={handleSubmit}
          className="shadow-lg"
          action="#"
          method="POST"
        >
          <h2 className="mb-3">Search Rooms</h2>
          <div className="form-group mt-3">
            <label htmlFor="location_field" className="mb-1">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              id="location_field"
              placeholder="Seach places.."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="guest_field" className="mb-1">
              No. of Guests
            </label>
            <select
              className="form-select"
              id="guest_field"
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
            >
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-3">
            <label htmlFor="room_type_field" className="mb-1">
              Room Type
            </label>
            <select
              className="form-select"
              id="room_type_field"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              {["King", "Single", "Twins"].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-btn w-100 py-2">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
