import { ArrowDownIcon, CalendarIcon, Circle, CircleCheckBig, Edit2, Minus, Plus, RefreshCw } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import DeleteItem from './DeleteItem'
import { Button } from '../ui/button'
import MarkAsPaid from './MarkAsPaid'
import { cn, getDayFromFormattedDate, getOrdinalDay } from '@/lib/utils'
import EditItem from './EditItem'
import { FormattedDate2 } from '@/lib/FormattedDate2'
import Image from 'next/image'
import { useData } from '../contexts/DataContext'
import { Edit, Trash2, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"


const SingleItem = ({ item }) => {

    const { paidKey } = useData()
    const isPaid = item.paidMonths.includes(paidKey)


    return (
        <>

            <div className="w-full mx-auto">
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border">
                    <CardContent className="p-0">
                        {/* Header with date and actions */}
                        <div
                            className={`flex items-center justify-between px-4 py-2 transition-colors ${isPaid
                                ? "bg-green-50 dark:bg-green-950/20 border-b border-green-200 dark:border-green-800/30"
                                : "bg-muted/50 border-b"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                    <span className='capitalize font-medium'>{item?.frequency || "One-time"}</span> on <span className='font-semibold'>{getOrdinalDay(getDayFromFormattedDate(FormattedDate2(item.date)))}</span>
                                    {/* Due on <span className='font-semibold'>{getOrdinalDay(getDayFromFormattedDate(FormattedDate2(item.date)))}</span> */}
                                </span>

                            </div>

                            <div className="flex items-center gap-1">
                                <DeleteItem deleteID={item.$id} />
                                <EditItem item={item} />
                            </div>
                        </div>

                        <div className="px-4 py-5 space-y-4">
                            {/* Title and description */}
                            <div className="flex items-start gap-4">

                                {item.type === "payment" ?
                                    <div className="w-3 h-3 rounded-full bg-red-500 dark:bg-red-400 mt-1.5 flex-shrink-0"></div>
                                    :
                                    <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 mt-1.5 flex-shrink-0"></div>
                                }

                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg leading-tight text-foreground">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                </div>
                                <div className="text-right -mt-1">
                                    <div
                                        className={`text-2xl font-bold transition-colors ${isPaid ? "text-green-600 dark:text-green-400 line-through" : item.type === "payment" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                                            }`}
                                    >
                                        € {item.amount}
                                    </div>
                                    {isPaid && <div className="text-sm text-green-600 dark:text-green-400 font-semibold">Paid</div>}
                                    {/* {isPaid && (
                                        <Badge className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-xs">
                                            Paid
                                        </Badge>
                                    )} */}
                                </div>
                            </div>

                            <Separator />

                            {/* Date range */}
                            {item.isRecurring ?
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <div className="text-muted-foreground font-medium text-sm mb-0.5">Starts</div>
                                        <div className="font-semibold text-foreground">{FormattedDate2(item.date)}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground font-medium text-sm mb-0.5">Ends</div>
                                        <div className="font-semibold text-foreground">{item.endDate ? FormattedDate2(item.endDate) : "-"}</div>
                                    </div>
                                </div>
                                :
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-muted-foreground font-medium text-sm mb-0.5">Date</div>
                                    <div className="font-semibold text-foreground">{FormattedDate2(item.date)}</div>
                                </div>
                            }

                            {item.type === "payment" && <MarkAsPaid item={item} />}
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* <div
                className={cn("bg-muted shadow text-muted-background rounded-lg flex flex-col gap-4", isPaid && "opacity-50")}
            >

                <div className="flex justify-between items-center gap-10 border-b border-foreground/10 dark:border-background px-4 py-3">
                    <span className="flex gap-2 text-base items-center justify-center">
                        <CalendarIcon className="w-4 h-4" />
                        <span className="font-medium">{FormattedDate2(item.date)}</span>
                    </span>

                    <div className='flex gap-2'>
                        <DeleteItem deleteID={item.$id} />
                        <EditItem item={item} />
                    </div>
                </div>

                <div className="flex flex-col gap-3 px-5">
                    <div className="flex pr-16 relative items-start gap-2">
                        {item.type === "income" ? <ArrowDownIcon className="h-6 w-6 stroke-2.5 text-[#42AB5D] mt-0.5" /> : isPaid ? <CircleCheckBig className="text-[#42AB5D] stroke-2.5 mt-0.5" /> : <Circle className="text-red-600 stroke-2.5 mt-0.5" />}
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    {item.description && <p className="mt-1 text-sm">{item.description}</p>}
                    {item.amount &&
                        <div className={cn("text-2xl font-bold ml-auto flex items-center gap-1", item.type === "payment" ? "text-red-600" : "text-[#42AB5D]")}>
                            <span>{item.type === "income" ? <Plus className='stroke-[4px] w-5' /> : isPaid && <Minus className='stroke-[4px] w-5' />}</span>  € {item.amount}
                        </div>
                    }
                </div>

                <div className="grid grid-cols-3 px-4">
                    {item.frequency ?
                        <span variant="outline" className="gap-1 text-xs py-2 rounded-full flex items-center justify-center border self-center dark:border-background">
                            <RefreshCw className="w-3 h-3" />
                            {item.frequency}
                        </span>
                        :
                        <span />
                    }

                    <span className="flex flex-col gap-1 text-xs items-center justify-center">
                        {item.date ?
                            <>
                                <span className="font-bold">Starts</span>
                                <span className="font-medium">{FormattedDate2(item.date)}</span>
                            </>
                            :
                            "No end date"
                        }
                    </span>
                    <span className="flex flex-col gap-1 text-xs items-center justify-center">
                        {item.endDate ?
                            <>
                                <span className="font-bold">Ends</span>
                                <span className="font-medium">{FormattedDate2(item.endDate)}</span>
                            </>
                            :
                            "No end date"
                        }
                    </span>
                </div>

                <div className="flex gap-2 p-4 pt-0 relative justify-end">
                    {item.type === "payment" && isPaid &&
                        <div className='absolute left-6'>
                            <Image
                                priority
                                src="/icons/paidIcon.svg"
                                height={85}
                                width={85}
                                alt="Paid"
                            />
                        </div>
                    }
                    {item.type === "payment" && <MarkAsPaid item={item} />}
                </div>

            </div> */}
        </>
    )
}

export default SingleItem