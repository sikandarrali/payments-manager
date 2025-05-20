"use client";
import { AuthProvider } from "../contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoadingFallback from "@/components/loaders/LoadingFallback";
import { useParams } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import { I18nProviderClient } from "@/locales/client";
import { NextJSThemeProvider } from "@/components/providers/NextJSThemeProvider";
import { AppProvider } from "@/components/contexts/AppContext";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "../contexts/DataContext";

const Providers = ({ children }) => {

	const params = useParams()

	return (
		<I18nProviderClient
			locale={params.locale}
			fallbackLocale="ur"
			fallback={<LoadingFallback />}
		>
			<AuthProvider>
				<AppProvider>
					<DataProvider>
						<NextJSThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<TooltipProvider>
								<ToastContainer
									limit={1}
									autoClose={1000}
									position="top-center"
									pauseOnFocusLoss
									draggable
								/>
								{/* Toast Container is in AppProvider */}
								<div className="relative max-w-lg mx-auto">
									{children}
								</div>
							</TooltipProvider>
						</NextJSThemeProvider>
					</DataProvider>
				</AppProvider>
			</AuthProvider>
		</I18nProviderClient>
	);
};

export default Providers;
