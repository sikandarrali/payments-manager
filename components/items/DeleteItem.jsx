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
                variant='outline'
                size="icon"
                onClick={() => setOpenDelete(true)}
                className="w-8 h-8"
            >
                <Trash2 className="w-3.5 h-3.5" />
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