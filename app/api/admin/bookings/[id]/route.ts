import db from "@/backend/config/db";
import { deleteBooking } from "@/backend/controllers/bookingController";
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
router.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteBooking)

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}