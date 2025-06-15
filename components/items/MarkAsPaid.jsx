import React from 'react'
import { Button } from '../ui/button'
import { db } from '../appwrite/database';
import { toast } from 'react-toastify';
import { ToastOptions } from '@/lib/ToastOptions';
import { useI18n } from '@/locales/client';
import { useData } from '../contexts/DataContext';
import { Query } from 'appwrite';
import { CheckCircle, Circle } from 'lucide-react';

const MarkAsPaid = ({ item }) => {

    const t = useI18n()

    const { paidKey } = useData()

    const isPaid = item.paidMonths.includes(paidKey)

    const onMarkAsPaid = async () => {

        let tempPaidMonths = []

        if (isPaid) {
            tempPaidMonths = Array.isArray(item.paidMonths)
                ? item.paidMonths.filter(m => m !== paidKey)
                : [];
        } else {
            tempPaidMonths = Array.isArray(item.paidMonths)
                ? item.paidMonths.includes(paidKey)
                    ? [...item.paidMonths] // already exists, don't add again
                    : [...item.paidMonths, paidKey] // add if not present
                : [paidKey]; // if not an array, initialize with paidKey
        }

        try {
            const tempItems = {
                paidMonths: tempPaidMonths,
                isPaid: !isPaid
            };
            await db.items.update(tempItems, item.$id);
            if (item.isPaid) {
                toast.success(t('alerts.markedAsUnpaid'), ToastOptions);
            } else {
                toast.success(t('alerts.markedAsPaid'), ToastOptions);
            }
        } catch (error) {
            // toast.error(t('alerts.exception'), ToastOptions);
            console.log(error)
        }
    }

    return (
        <>
            {/* <Button
                className={"ml-auto rounded-full bg-card"}
                onClick={() => onMarkAsPaid()}
                variant='outline'
            >
                {isPaid ? "Mark as Unpaid" : "Mark as Paid"}
            </Button> */}

            <Button
                className="w-full transition-colors"
                variant={isPaid ? "secondary" : "outline"}
                onClick={() => onMarkAsPaid()}
            >
                {isPaid ? (
                    <>
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                        Mark as Unpaid
                    </>
                ) : (
                    <>
                        <Circle className="h-4 w-4 mr-2" />
                        Mark as Paid
                    </>
                )}
            </Button>
        </>
    )
}

export default MarkAsPaid