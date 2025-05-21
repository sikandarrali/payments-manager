import { ArrowDownIcon, CalendarIcon, Circle, CircleCheckBig, Edit2, Minus, Plus, RefreshCw } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from '../ui/badge'
import DeleteItem from './DeleteItem'
import { Button } from '../ui/button'
import MarkAsPaid from './MarkAsPaid'
import { cn } from '@/lib/utils'
import EditItem from './EditItem'
import { FormattedDate2 } from '@/lib/FormattedDate2'
import Image from 'next/image'
import { useData } from '../contexts/DataContext'

const SingleItem = ({ item }) => {

    const { paidKey } = useData()
    const isPaid = item.paidMonths.includes(paidKey)


    return (
        <div
            key={item.$id}
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

            {item.isReccurring &&
                <div className="grid grid-cols-3 px-4">
                    {item.frequency ?
                        <span variant="outline" className="gap-1 text-xs py-2 rounded-full flex items-center justify-center border self-center dark:border-background">
                            <RefreshCw className="w-3 h-3" />
                            {item.frequency}
                        </span>
                        :
                        <span />
                    }

                    <span className="w-[1px] h-5 bg-foreground/20 self-center justify-self-center" />
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
            }

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

        </div>
    )
}

export default SingleItem