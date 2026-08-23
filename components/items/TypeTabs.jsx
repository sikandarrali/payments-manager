import React from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

const TypeTabs = ({ activeTab, setActiveTab }) => {

    return (
        <div className="flex p-1 gap-1 bg-muted rounded-lg self-start justify-self-start">
            <Button
                size="sm"
                variant="secondary"
                onClick={() => setActiveTab("payment")}
                className={cn("min-h-7 bg-transparent hover:bg-background font-semibold text-[13px]", activeTab === "payment" ? "bg-background shadow" : "opacity-70")}            >
                Payment
            </Button>
            <Button
                size="sm"
                variant="secondary"
                onClick={() => setActiveTab("income")}
                className={cn("min-h-7 bg-transparent hover:bg-background font-semibold text-[13px]", activeTab === "income" ? "bg-background shadow" : "opacity-70")}
            >
                Income
            </Button>
        </div>
    )
}

export default TypeTabs