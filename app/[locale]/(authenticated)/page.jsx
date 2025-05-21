"use client";
import PageContainer from "@/components/providers/PageContainer";
import { FixStickyHeaderScrollError } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import SingleItem from "@/components/items/SingleItem";
import Summary from "@/components/items/Summary";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useData } from "@/components/contexts/DataContext";
import MonthSwitcher from "@/components/items/MonthSwitcher";
import { AddButtonWrapper } from "@/components/theme/AddButtonWrapper";
import { Button } from "@/components/ui/button";
import AddItemDialog from "@/components/items/AddItemDialog";

export default function Page() {
	const scrollRef = useRef(null);

	const [openAddPaymentDialog, setOpenAddPaymentDialog] = useState(false)
	const [searchTerm, setSearchTerm] = useState("")
	const { items } = useData()

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

			<div className=" gap-6 flex flex-col">
				{items.length > 0 ?
					items.map((item) => (
						<SingleItem item={item} key={item.$id} />
					))
					:
					<div className="text-center italic text-muted-foreground mt-4">No Items Found for this month</div>
				}
			</div>

			{/* </div> */}

			<AddButtonWrapper>
				<Button className="rounded-full w-16 h-16 lg:h-14 lg:w-14" size="icon" onClick={() => setOpenAddPaymentDialog(true)}>
					<Plus className="w-9 h-9" />
				</Button>
			</AddButtonWrapper>

			<AddItemDialog isOpen={openAddPaymentDialog} setisOpen={setOpenAddPaymentDialog} />
		</PageContainer >
	);
}
