"use client";
import PageContainer from "@/components/providers/PageContainer";
import { Button } from "@/components/ui/button";
import UIText from "@/components/theme/UIText";
import Link from "next/link";
import { Logo } from "@/components/nav/Logo";
import { DarkModeToggle } from "@/components/theme/DarkModeToggle";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { withLocale } from "@/lib/routes";

export const Homepage = () => {
	const t = useScopedI18n('home')
	const locale = useCurrentLocale()

	return (
		<PageContainer hideBackButton hideAddButton hideNavbar>
			<div className="flex flex-col pt-8 w-full flex-1">

				<div className={'flex items-center gap-8 justify-between'}>
					<Logo />
					<DarkModeToggle />
				</div>

				<div className="mx-4 mt-12 text-center">
					<UIText weight={'semibold'} variant={'heading'} text={t('title')} />
					<p className="mt-2 text-sm text-muted-foreground">
						{t('tagline')}
					</p>
				</div>

				<Link href={withLocale('/login', locale)} className="mx-4 mt-8">
					<Button className="w-full ltr:py-4 rtl:py-5">
						<UIText weight={'semibold'} variant={'button'} text={t('getStarted')} />
					</Button>
				</Link>

				<p className="text-center mt-6 text-sm text-muted-foreground">
					{t('appPricing')}
				</p>

				<div className={'text-sm mt-8 mb-4 text-center left-1/2 w-full -translate-x-1/2 fixed bottom-10'} dir={'ltr'}>
					<Link href={withLocale('/terms-of-service', locale)} className={'text-primary font-semibold'}>Terms of Service</Link>{" "}
					and{" "}
					<Link href={withLocale('/privacy-policy', locale)} className={'text-primary font-semibold'}>Privacy Policy</Link>
				</div>
			</div>
		</PageContainer>
	);
};
