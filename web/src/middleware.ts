import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const session = request.cookies.get("session")?.value;

    const isAuthPage = request.url.includes("/account");

    if (isAuthPage) {
        if (session) {
            return NextResponse.redirect(new URL("/dashboard/settings", request.url));
        }

        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(new URL("/account/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/account/:path*", "/dashboard/:path*"],
};

