import db from "@/backend/config/db";
import { newRoom } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()
router.post(newRoom)

export async function POST(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}