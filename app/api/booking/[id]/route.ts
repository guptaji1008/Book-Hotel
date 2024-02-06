import db from "@/backend/config/db";
import { bookingDetails } from "@/backend/controllers/bookingController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.use(isAuthenticatedUser).get(bookingDetails)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}