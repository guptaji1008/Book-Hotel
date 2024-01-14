import db from "@/backend/config/db";
import { deleteRoom, updateRoomDetails } from "@/backend/controllers/roomController";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
    params: {
        id: string
    }
}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.put(updateRoomDetails)
router.delete(deleteRoom)

export async function PUT(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}

export async function DELETE(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}