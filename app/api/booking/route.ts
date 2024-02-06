import db from "@/backend/config/db";
import { newBooking } from "@/backend/controllers/bookingController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.use(isAuthenticatedUser).post(newBooking)

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}