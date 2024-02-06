import { cookies } from 'next/headers'

export const cookieName = () => {
    return process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token"
}

export const getAuthHeader = () => {
    const nextCookie = cookies();

    const nextAuthSessionToken = nextCookie.get(cookieName());

    return {
        headers: {
            Cookie: `${nextAuthSessionToken?.name}=${nextAuthSessionToken?.value}`,
        }
    }
}