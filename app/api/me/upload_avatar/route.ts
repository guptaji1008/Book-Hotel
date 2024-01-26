import db from "@/backend/config/db";
import { updateAvatar } from "@/backend/controllers/userController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.use(isAuthenticatedUser).put(updateAvatar)

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}