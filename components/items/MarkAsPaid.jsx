import React from 'react'
import { Button } from '../ui/button'
import { db } from '../appwrite/database';
import { toast } from 'react-toastify';
import { ToastOptions } from '@/lib/ToastOptions';
import { useI18n } from '@/locales/client';

const MarkAsPaid = ({ itemID, isPaid }) => {

    const t = useI18n()

    const onMarkAsPaid = async (itemID, isPaid) => {

        try {
            const tempItems = {
                isPaid: !isPaid,
            };

            await db.items.update(tempItems, itemID);
            if (isPaid) {
                toast.success(t('alerts.markedAsUnpaid'), ToastOptions);
            } else {
                toast.success(t('alerts.markedAsPaid'), ToastOptions);
            }
        } catch (error) {
            toast.error(t('alerts.exception'), ToastOptions);
        }
    }

    return (
        <Button
            className={"ml-auto rounded-full bg-card"}
            onClick={() => onMarkAsPaid(itemID, isPaid)}
            variant='outline'
        >
            {isPaid ? "Mark as Unpaid" : "Mark as Paid"}
        </Button>
    )
}

export default MarkAsPaid