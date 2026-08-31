"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UIText from "@/components/theme/UIText";
import { LOCAL_COOKIE_NOTICE_ACK_NAME } from "@/lib/defaults";
import { useCurrentLocale } from "@/locales/client";
import { withLocale } from "@/lib/routes";

export const CookieBanner = () => {
    const [show, setShow] = useState(false);
    const locale = useCurrentLocale();

    useEffect(() => {
        if (typeof window !== "undefined" && !localStorage.getItem(LOCAL_COOKIE_NOTICE_ACK_NAME)) {
            setShow(true);
        }
    }, []);

    const onAccept = () => {
        localStorage.setItem(LOCAL_COOKIE_NOTICE_ACK_NAME, "true");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-[200] flex justify-center px-4 pb-4">
            <div className="w-full max-w-lg rounded-lg border bg-card p-4 shadow-lg flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <UIText
                    variant={"sm"}
                    textOrientation={"left"}
                    className="text-muted-foreground"
                    text={
                        <>
                            We use strictly necessary cookies to keep you signed in and remember your language. No tracking or advertising cookies.{" "}
                            <Link href={withLocale('/privacy-policy', locale)} className="underline text-foreground">
                                Learn more
                            </Link>
                        </>
                    }
                />
                <Button size="sm" className="shrink-0" onClick={onAccept}>
                    <UIText variant={"button"} text={"Got it"} />
                </Button>
            </div>
        </div>
    );
};
