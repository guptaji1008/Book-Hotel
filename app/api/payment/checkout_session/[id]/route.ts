import db from "@/backend/config/db";
import { stripeCheckoutSession } from "@/backend/controllers/paymentController";
import { isAuthenticatedUser } from "@/backend/middleware/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>()

db()

router.use(isAuthenticatedUser).get(stripeCheckoutSession)

export async function GET(request: NextRequest, ctx: RequestContext) {
    return router.run(request, ctx)
}