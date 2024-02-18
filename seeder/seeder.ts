import Room from "../backend/models/room";
import mongoose from "mongoose"
import { rooms } from "./data";

const seedRooms = async () => {
    try {
        await mongoose.connect("mongodb+srv://hotelbooking:hotelbooking123@cluster0.gqdumua.mongodb.net/hotel-booking?retryWrites=true&w=majority");

        await Room.deleteMany();
        console.log("Rooms are deleted");

        await Room.insertMany(rooms);
        console.log("Rooms are added");

        process.exit()
    } catch (error) {
       console.log(error);
       process.exit(); 
    }
}

seedRooms();