import db from "@/backend/config/db";
import { resetPassword } from "@/backend/controllers/userController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()
router.put(resetPassword)

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}