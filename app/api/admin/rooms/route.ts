import db from "@/backend/config/db";
import { allAdminRooms, newRoom } from "@/backend/controllers/roomController";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()
router.use(isAuthenticatedUser, authorizeRoles('admin')).post(newRoom)
router.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminRooms)

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}
export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}