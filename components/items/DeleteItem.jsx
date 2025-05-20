import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TriangleAlert } from "lucide-react";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog";
import UIText from '../theme/UIText';
import { db } from '../appwrite/database';
import { toast } from 'react-toastify';
import { ToastOptions } from '@/lib/ToastOptions';
import { useI18n } from '@/locales/client';


const DeleteItem = ({ deleteID }) => {

    const [openDelete, setOpenDelete] = useState(false)

    const t = useI18n()

    const onDelete = async () => {
        await db.items.delete(deleteID);
        toast.success(t('alerts.deleted'), ToastOptions);
    }


    return (
        <div>

            <Button variant='outline' size='icon' onClick={() => setOpenDelete(true)}><Trash2 className="w-4 h-4" /></Button>


            <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
                <AlertDialogContent className={"w-[90%] rounded-xl overflow-auto"}>
                    <AlertDialogHeader className={'!text-left'}>
                        <AlertDialogTitle className={'text-primary flex items-center justify-center gap-2 font-normal'}>
                            <TriangleAlert className={'w-5 h-5'} />
                            <UIText variant={'heading'} text={"Confirm Deletion"} />
                        </AlertDialogTitle>
                        <AlertDialogDescription className={"flex flex-col text-base items-center gap-4 !my-5"}>
                            This will permanently delete this item, are you sure?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter className={'!flex-row items-center !justify-between gap-4'} dir={'ltr'}>
                        <AlertDialogCancel className={'mt-0'} onClick={() => onDelete(deleteID)}>
                            <UIText variant={'button'} text={'Yes, Delete'} />
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => setOpenDelete(false)}>
                            <UIText variant={'button'} text={'Cancel'} />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>



        </div>
    )
}

export default DeleteItem