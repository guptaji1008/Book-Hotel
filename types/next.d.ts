import { IUser } from "@/backend/models/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { NextRequest } from 'next/server'

declare module "@redux/toolkit/query/react" {
    interface FetchBaseQueryError {
        data?: any;
    }
}

declare module "next/server" {
    interface NextRequest {
        user: IUser;
    }
}