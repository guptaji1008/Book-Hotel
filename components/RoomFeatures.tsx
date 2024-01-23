import { IRoom } from "@/backend/models/room";
import { FaUsers, FaBed, FaCheck, FaTimes } from "react-icons/fa";

const RoomFeatures = ({ room }: { room: IRoom }) => {
  return (
    <div className="features mt-5">
      <h3 className="mb-4">Features:</h3>
      <div className="room-feature">
        <FaUsers />
        <p>4 Guests</p>
      </div>
      <div className="room-feature">
        <FaBed />
        <p>2 Beds</p>
      </div>
      <div className="room-feature">
        {room?.isBreakfast ? <FaCheck style={{color: "green"}}/> : <FaTimes style={{color: "red"}}/>}
        <p>Breakfast</p>
      </div>
      <div className="room-feature">
      {room?.isInternet ? <FaCheck style={{color: "green"}}/> : <FaTimes style={{color: "red"}}/>}
        <p>Internet</p>
      </div>
      <div className="room-feature">
      {room?.isAirConditioned ? <FaCheck style={{color: "green"}}/> : <FaTimes style={{color: "red"}}/>}
        <p>Air Conditioned</p>
      </div>
      <div className="room-feature">
      {room?.isPetsAllowed ? <FaCheck style={{color: "green"}}/> : <FaTimes style={{color: "red"}}/>}
        <p>Pets Allowed</p>
      </div>
      <div className="room-feature">
      {room?.isRoomCleaning ? <FaCheck style={{color: "green"}}/> : <FaTimes style={{color: "red"}}/>}
        <p>Room Cleaning</p>
      </div>
      {/* <!-- Repeat the above room-feature for each feature --> */}
    </div>
  );
};

export default RoomFeatures;
