import { createI18nMiddleware } from 'next-international/middleware'
import { ENDPOINT, PROJECT_ID } from "@/components/appwrite/appwrite";
import { DecodeUserId } from "@/lib/EncodeDecode";
import { NextResponse } from "next/server";
import { HOMEPAGE_ROUTE, LOCALE_PROTECTED_ROUTES, LOCALE_PUBLIC_ROUTES } from "@/lib/routes";

const getCurrentUser = async (userSessionCookie) => {
    if (!userSessionCookie) return null
    try {
        const res = await fetch(`${ENDPOINT}/users/${DecodeUserId(userSessionCookie.value)}`, {
            headers: {
                'X-Appwrite-Project': PROJECT_ID,
                'X-Appwrite-Key': process.env.APPWRITE_API_KEY,
            },
        });
        if (!res.ok) return null
        return await res.json()
    }
    catch (e) {
        return null
    }
}

export default async function middleware(request) {

    let userSessionCookie = request.cookies.get(process.env.NEXT_PUBLIC_USER_SESSION_COOKIE_NAME)

    const user = await getCurrentUser(userSessionCookie, request);
    const pathname = request.nextUrl.pathname;
    const isPublicPath = LOCALE_PUBLIC_ROUTES().includes(pathname);
    const isProtectedPath = LOCALE_PROTECTED_ROUTES().includes(pathname);
    // const locale = user?.prefs?.lang || "ur";
    const locale = user?.prefs?.lang || "en";

    if (user && isPublicPath) {
        // return NextResponse.redirect(new URL(HOMEPAGE_ROUTE, request.url))
        return NextResponse.redirect(new URL(HOMEPAGE_ROUTE, request.url))
    }

    // if (user && pathname === "/") {
    //     return NextResponse.redirect(new URL(HOMEPAGE_ROUTE, request.url))
    // }

    if (!user && isProtectedPath) {
        const localeMatch = pathname.match(/^\/(en|ur)(\/|$)/);
        const loginPath = localeMatch ? `/${localeMatch[1]}/login` : "/login";
        return NextResponse.redirect(new URL(loginPath, request.url));
    }

    const I18nMiddleware = createI18nMiddleware({
        locales: ['en', 'ur'],
        defaultLocale: "en",
        urlMappingStrategy: 'rewrite',
        resolveLocaleFromRequest: request => {
            return user?.prefs?.lang || 'en'
        }
    })

    return I18nMiddleware(request)
}

const otherConfig = ['/((?!api|_next|.*\\..*).*)'];
const matcher = otherConfig.concat(LOCALE_PROTECTED_ROUTES());

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
}