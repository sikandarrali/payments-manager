"use client";
import PageContainer from "@/components/providers/PageContainer";
import { cn, FixStickyHeaderScrollError } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import SingleItem from "@/components/items/SingleItem";
import Summary from "@/components/items/Summary";
import { useData } from "@/components/contexts/DataContext";
import MonthSwitcher from "@/components/items/MonthSwitcher";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Button } from "@/components/ui/button";

export default function Page() {
	const scrollRef = useRef(null);
	// const [searchTerm, setSearchTerm] = useState("")
	const { items } = useData()
	const [filterBy, setFilterBy] = useState("payment")

	useEffect(() => {
		if (scrollRef.current) {
			FixStickyHeaderScrollError(scrollRef.current);
		}
	}, []);

	return (
		<PageContainer hideBackButton>
			{/* <div className="flex flex-col gap-4 relative"> */}

			<MonthSwitcher />

			<Summary />

			{/* <div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						placeholder="Search..."
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div> */}

			<div className="flex p-1 gap-1 bg-muted rounded-lg self-start ml-auto">
				<Button
					size="sm"
					variant="secondary"
					onClick={() => setFilterBy("payment")}
					className={cn("min-h-7 bg-transparent hover:bg-background font-semibold text-[13px]", filterBy === "payment" ? "bg-background shadow" : "opacity-70")}            >
					Payments
				</Button>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => setFilterBy("income")}
					className={cn("min-h-7 bg-transparent hover:bg-background font-semibold text-[13px]", filterBy === "income" ? "bg-background shadow" : "opacity-70")}
				>
					Incomes
				</Button>
			</div>

			<div className="gap-6 flex flex-col">
				{items.length > 0 ?
					items.filter((item) => item.type === filterBy)
						.map((item) => (
							<SingleItem item={item} key={item.$id} />
						))
					:
					<div className="text-center italic text-muted-foreground mt-4">No Items Found for this month</div>
				}
			</div>
			<ScrollToTopButton />

		</PageContainer >
	);
}
