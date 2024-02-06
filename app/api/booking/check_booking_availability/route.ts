import db from "@/backend/config/db";
import { checkRoomBookingAvailibility } from "@/backend/controllers/bookingController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.get(checkRoomBookingAvailibility)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}