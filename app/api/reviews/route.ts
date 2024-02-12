import db from "@/backend/config/db";
import { createRoomReview } from "@/backend/controllers/roomController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.use(isAuthenticatedUser).put(createRoomReview)

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}