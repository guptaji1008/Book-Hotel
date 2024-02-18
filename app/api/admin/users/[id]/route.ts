import db from "@/backend/config/db";
import { deleteUser, getUserDetails, updateUserDetails } from "@/backend/controllers/userController";
import { authorizeRoles, isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string;
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()
router.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails)
router.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUserDetails)
router.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}
export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}
export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}