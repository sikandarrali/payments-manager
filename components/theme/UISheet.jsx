import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import * as React from "react";
import { useMediaQuery } from "react-responsive";

export const UISheet = ({ open, onOpenChange, defaultOpen, bgColor, className, title, description, children }) => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

    return (
        <Sheet open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            <SheetContent
                className={cn(
                    "pb-12 flex flex-col flex-1 outline-0 overflow-auto !max-h-[90%] sm:!max-w-screen lg:!max-w-[40rem] lg:!max-h-fit lg:min-h-screen border-t-2 border-primary border-l-0",
                    bgColor,
                    className
                )}
                side={isDesktop ? "right" : "bottom"}
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                {/* <div className={'hidden'}> */}
                {(title || description) &&
                    <SheetHeader>
                        {title && <SheetTitle className="text-left">Title</SheetTitle>}
                        {description && <SheetDescription className="text-left">Description</SheetDescription>}
                    </SheetHeader>
                }
                {/* </div>/ */}

                {/* Content */}
                <div className="flex flex-col w-full flex-1 pt-4 justify-start">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}