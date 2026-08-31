import "@/styles/globals.css";
import { NetworkStatusIndicator } from "@/components/NetworkStatus/NetworkStatusIndicator";
import HolyLoader from "holy-loader";
import Providers from "@/components/providers/Providers";
import { cn } from "@/lib/utils";
import { Poppins, Work_Sans } from "@next/font/google";


const fontSans = Work_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontHeading = Poppins({
	subsets: ["latin"],
	variable: "--font-heading",
	weight: ["600"]
});

// const fontUrdu = Noto_Nastaliq_Urdu({
// 	subsets: ["latin"],
// 	weight: ["variable"],
// 	variable: "--font-urdu",
// });

// const fontUrduHeading = localFont({
// 	display: "swap",
// 	src: "../../fonts/Nafees Riqa.ttf",
// 	variable: "--font-urdu-heading",
// });

const APP_NAME = "Payments Manager";
const APP_DEFAULT_TITLE = "Payments Manager";
const APP_TITLE_TEMPLATE = "Payments Manager";
const APP_DESCRIPTION = "Track your payments in one place";
const APP_URL = "https://payments-manager.sikandar.info";
const APP_OG_IMAGE = {
	url: "/og-image.png",
	width: 1200,
	height: 630,
	alt: APP_NAME,
};

export const metadata = {
	metadataBase: new URL(APP_URL),
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
		// startUpImage: [],
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		url: APP_URL,
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
		images: [APP_OG_IMAGE],
	},
	twitter: {
		card: "summary_large_image",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
		images: [APP_OG_IMAGE],
	},
};

// export const viewport = {
// 	themeColor: APP_THEME.VIEWPORT,
// };


export default async function RootLayout({ children, params }) {

	return (
		<html
			lang={params.locale}
			suppressHydrationWarning
			style={{ width: "100%", height: "100%" }}
		>
			<head>
				<title>Payments Manager</title>
				{/* <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" /> */}

				<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" media="(prefers-color-scheme: light)" />
				<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-dark.png" media="(prefers-color-scheme: dark)" />

				<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
				<meta name="theme-color" content="#0B0A0A" id="theme-color" />
			</head>
			<body
				dir={params.locale === 'ur' ? 'rtl' : 'ltr'}
				className={cn(
					"min-h-screen font-sans antialiased",
					fontSans.variable,
					fontHeading.variable,
					// fontUrdu.variable,
					// fontUrduHeading.variable,
				)}
			>

				<NetworkStatusIndicator />

				{/* topbar loader */}
				<HolyLoader
					// color="#E11D48"
					// color="#000"
					color="linear-gradient(90deg, rgba(225,29,72,1) 0%, rgba(0,212,255,1) 100%)"
					height="5px"
					speed={250}
					easing="linear"
					showSpinner
				/>

				<Providers>
					{children}
				</Providers>

			</body>
		</html>
	);
}
