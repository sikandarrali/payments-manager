import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ArrowDownIcon, ArrowUpIcon, WalletIcon } from 'lucide-react'
import { Progress } from '../ui/progress'
import { useData } from '../contexts/DataContext'
import { GetMonthNameYearFromDateObject } from '@/lib/GetMonthNameYearFromDateObject'

const Summary = () => {

    const { currentMonth, sumOfIncomes, sumOfPayments } = useData()

    const percentage = sumOfIncomes > 0 ? (sumOfPayments / sumOfIncomes) * 100 : 0

    return (
        <div className="flex flex-row overflow-x-auto gap-4 pb-2 -mt-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Balance</CardTitle>
                    <WalletIcon className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent className="w-[200px]">
                    <div className="text-2xl font-bold">€ {sumOfIncomes - sumOfPayments}</div>
                    <div className="mt-2">
                        <Progress value={percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1 flex items-center justify-between gap-2">
                            {/* <span>{GetMonthNameYearFromDateObject(currentMonth)}</span> */}
                            {/* <span className='w-1 h-1 bg-foreground rounded-full'></span> */}
                            {percentage > 0 && <span className='font-medium'>{percentage.toFixed(2)}% spent </span>}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Spent</CardTitle>
                    <ArrowUpIcon className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent className="w-[200px]">
                    <div className="text-2xl font-bold">€ {sumOfPayments}</div>
                    <p className="text-xs text-muted-foreground">{GetMonthNameYearFromDateObject(currentMonth)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Income</CardTitle>
                    <ArrowDownIcon className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent className="w-[200px]">
                    <div className="text-2xl font-bold">€ {sumOfIncomes}</div>
                    <p className="text-xs text-muted-foreground">{GetMonthNameYearFromDateObject(currentMonth)}</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default Summary