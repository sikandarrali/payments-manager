import React from 'react'
import DeleteItem from './DeleteItem'
import MarkAsPaid from './MarkAsPaid'
import { getDayFromFormattedDate, getOrdinalDay } from '@/lib/utils'
import EditItem from './EditItem'
import { FormattedDate2 } from '@/lib/FormattedDate2'
import { useData } from '../contexts/DataContext'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const SingleItem = ({ item }) => {

    const { paidKey } = useData()
    const isPaid = item.paidMonths.includes(paidKey)

    return (
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
                            </div>
                        </div>

                        <Separator />

                        {/* Date range */}
                        {item.isRecurring ?
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-muted-foreground font-medium text-xs mb-0.5">Starts</div>
                                    <div className="font-semibold text-foreground">{FormattedDate2(item.date)}</div>
                                </div>
                                <div>
                                    <div className="text-muted-foreground font-medium text-xs mb-0.5">Ends</div>
                                    <div className="font-semibold text-foreground">{item.endDate ? FormattedDate2(item.endDate) : "-"}</div>
                                </div>
                            </div>
                            :
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="text-muted-foreground font-medium text-xs mb-0.5">Date</div>
                                <div className="font-semibold text-foreground">{FormattedDate2(item.date)}</div>
                            </div>
                        }

                        {item.type === "payment" && <MarkAsPaid item={item} />}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SingleItem