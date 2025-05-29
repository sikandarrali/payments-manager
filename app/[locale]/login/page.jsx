"use client";
import { useAuth } from "@/components/contexts/AuthContext";
import PageContainer from "@/components/providers/PageContainer";
import { Button } from "@/components/ui/button";
import { useScopedI18n } from "@/locales/client";
import UIText from "@/components/theme/UIText";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HOMEPAGE_ROUTE } from "@/lib/routes";
import { Logo } from "@/components/nav/Logo";
import { DarkModeToggle } from "@/components/theme/DarkModeToggle";
import { Input } from "@/components/ui/input";
import FormLabel from "@/components/theme/FormLabel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { FormattedDateForCalenderDatePick } from "@/lib/FormattedDateForCalendarPick";

export default function Home() {
	const { onGoogleWithLogin, user } = useAuth();
	const t = useScopedI18n('login')
	const [openDate, setOpenDate] = useState("")
	const [date, setDate] = useState(new Date())

	if (user) {
		redirect(HOMEPAGE_ROUTE)
		return <></>
	}

	return (
		<PageContainer hideBackButton hideAddButton hideNavbar>
			<div className="flex flex-col pt-8 w-full flex-1">

				<div className={'flex items-center gap-8 justify-between'}>
					<Logo />
					<DarkModeToggle />
				</div>


				<div className="flex flex-col gap-2">

					<Popover open={openDate} onOpenChange={setOpenDate}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="justify-start text-left font-normal"
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? FormattedDateForCalenderDatePick(date) : "Select a date"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={(date) => {
									setDate(date)
									setOpenDate(false)
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>

				<Button
					onClick={() => onGoogleWithLogin()}
					className="mx-4 mt-20 ltr:py-4 rtl:py-5 flex items-center gap-2 rtl:gap-3"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 12C6 15.3137 8.68629 18 12 18C14.6124 18 16.8349 16.3304 17.6586 14H12V10H21.8047V14H21.8C20.8734 18.5645 16.8379 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C15.445 2 18.4831 3.742 20.2815 6.39318L17.0039 8.68815C15.9296 7.06812 14.0895 6 12 6C8.68629 6 6 8.68629 6 12Z"
							fill="currentColor"
						/>
					</svg>
					<UIText weight={'semibold'} variant={'button'} text={t('withGoogle')} />
				</Button>


				<div className={'text-sm mt-8 mb-4 text-center left-1/2 w-full -translate-x-1/2 fixed bottom-10'} dir={'ltr'}>
					<span>By Logging In, you agree to our</span><br />
					<Link href={'/terms-of-service'} className={'text-primary font-semibold'}>Terms of Service</Link>{" "}
					and{" "}
					<Link href={'/privacy-policy'} className={'text-primary font-semibold'}>Privacy Policy</Link>{" "}
				</div>
			</div>
		</PageContainer>
	);
}


