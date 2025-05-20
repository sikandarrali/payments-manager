import Link from "next/link";
import { cn } from "@/lib/utils";

export const Logo = ({ size }) => {
    return (
        <Link
            href={'/'}
            className={cn(
                'flex gap-1 self-start cursor-pointer select-none',
                size === '2xl' && "scale-150"
            )}
            dir={'ltr'}
        >
            <div className="relative pl-2 pr-0.5 py-2 flex">
                <span className="absolute left-0 h-full w-0.5 top-0 bg-foreground rounded-md"></span>
                <span className="absolute left-0 top-0 h-0.5 w-3/6 bg-foreground rounded-md"></span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-foreground rounded-md"></span>


                <span className="relative flex flex-col gap-1 font-heading lowercase font-medium">
                    <span className="leading-none text-[12px]">
                        Payments
                    </span>
                    <span className="leading-none text-[16px]">
                        Manager
                    </span>
                </span>

            </div>
        </Link>
    )
}