import db from "@/backend/config/db";
import { allRoomReviews, deleteReview } from "@/backend/controllers/roomController";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()
router.use(isAuthenticatedUser, authorizeRoles('admin')).get(allRoomReviews)
router.use(isAuthenticatedUser, authorizeRoles('admin')).put(deleteReview)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}
export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}