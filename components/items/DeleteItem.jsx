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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import TypeTabs from './TypeTabs';


const DeleteItem = ({ deleteID }) => {

    const [openDelete, setOpenDelete] = useState(false)

    const t = useI18n()

    const onDelete = async () => {
        try {
            await db.items.delete(deleteID)
        } catch (error) {
            console.log(error)
        } finally {
            setOpenDelete(false)
            toast.success(t('alerts.deleted'), ToastOptions);
        }
    }


    return (
        <div>

            <Button
                variant='outline'
                size="icon"
                onClick={() => setOpenDelete(true)}
                className="w-8 h-8"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </Button>

            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent className="max-w-[90%] md:max-w-[500px] max-h-[90vh] z-50 overflow-auto rounded-2xl">
                    <DialogHeader className={"text-left"}>
                        <DialogTitle className="flex items-center gap-2 text-red-500">
                            <TriangleAlert className={'w-5 h-5'} />
                            <UIText variant={'heading'} text={"Confirm Deletion"} />
                        </DialogTitle>
                        <DialogDescription className="!mt-3">
                            This will permanently delete this item, are you sure?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex gap-4 justify-between">
                            <Button variant="outline" className={'mt-0'} onClick={() => onDelete(deleteID)}>
                                Yes, Delete
                            </Button>
                            <Button onClick={() => setOpenDelete(false)}>
                                Cancel
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default DeleteItem