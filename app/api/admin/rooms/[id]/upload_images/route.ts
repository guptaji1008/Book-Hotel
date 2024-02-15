import db from "@/backend/config/db";
import { uploadRoomImage } from "@/backend/controllers/roomController";
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

router.use(isAuthenticatedUser, authorizeRoles('admin')).put(uploadRoomImage)

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}