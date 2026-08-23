import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { db } from '../appwrite/database';
import { toast } from 'react-toastify';
import { ToastOptions } from '@/lib/ToastOptions';
import { useI18n } from '@/locales/client';

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"



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
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-destructive dark:text-red-500 hover:text-destructive hover:bg-destructive/10"
                onClick={() => setOpenDelete(true)}
            >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
            </Button>

            <Drawer open={openDelete} onOpenChange={setOpenDelete}>
                <DrawerContent className="max-w-[90%] md:max-w-[500px] max-h-[90vh] mx-auto">
                    <DrawerHeader className={"py-4 mt-6"}>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className={"flex flex-row justify-between items-center pb-10"}>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        <Button onClick={() => onDelete(deleteID)} > Yes, Delete</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div >
    )
}

export default DeleteItem