import db from "@/backend/config/db";
import { allRooms } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.get(allRooms)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}
