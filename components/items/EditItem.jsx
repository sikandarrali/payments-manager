import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import FormLabel from "@/components/theme/FormLabel";
import { UITextInput } from "@/components/theme/UITextInput";
import { ItemSchema } from "@/lib/schemas/ItemSchema";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { FormattedDateForCalenderDatePick } from "@/lib/FormattedDateForCalendarPick";
import { FormattedDate } from "@/lib/hooks/FormattedDate";
import { Form, Formik } from "formik";
import { useState } from "react"
import { cn, scrollToTop } from "@/lib/utils"
import { Button } from "../ui/button"
import { CalendarIcon, Edit2 } from "lucide-react"
import { db } from "../appwrite/database"
import { COLLECTION_ID_ITEMS, DATABASE_ID, databases } from "../appwrite/appwrite"
import { ID } from "node-appwrite"
import { toast } from "react-toastify"
import { ToastOptions } from "@/lib/ToastOptions"
import { useI18n } from "@/locales/client"
import { FormattedDate2 } from "@/lib/FormattedDate2"

const EditItem = ({ item }) => {

    const t = useI18n()

    const [isOpen, setIsOpen] = useState(false)


    const [toggleDescription, settoggleDescription] = useState(false)
    const [toggleNoEndDate, setToggleNoEndDate] = useState(false)

    const [openDate, setOpenDate] = useState("")
    const [openEndDate, setOpenEndDate] = useState("")


    const onEdit = async (values, isSubmitting) => {

        try {
            const items = {
                title: values.title,
                description: values.description,
                amount: values.amount,
                date: values.date,
                endDate: values.endDate,
                frequency: values.frequency,
                isRecurring: values.isRecurring,
            };

            await db.items.update(items, item.$id);
            toast.success(t('alerts.updated'), ToastOptions);
        } catch (error) {
            toast.error(t('alerts.exception'), ToastOptions);
            console.log(error)
        }
        setIsOpen(false);
        isSubmitting(false)

    };

    return (
        <>

            <Button
                variant='outline'
                size="icon"
                onClick={() => setIsOpen(true)}
                className="w-8 h-8"
            >
                <Edit2 className="w-3.5 h-3.5" />
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-[90%] md:max-w-[500px] max-h-[90vh] overflow-auto rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Edit {item.type === "payment" ? "Payment" : "Income"}</DialogTitle>
                        <DialogDescription>
                            Update the {item.type === "payment" ? "Payment" : "Income"} details.
                        </DialogDescription>
                    </DialogHeader>


                    <Formik
                        initialValues={{
                            title: item.title,
                            description: item.description,
                            amount: item.amount,
                            date: item.date,
                            endDate: item.endDate,
                            frequency: item.frequency,
                            isRecurring: item.isRecurring,
                        }}
                        validationSchema={ItemSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            onEdit(values, setSubmitting)
                        }}
                    >
                        {({
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            values,
                            isSubmitting
                        }) => (
                            <Form className="flex flex-col w-full space-y-4">

                                {/* Title */}
                                <div className={"flex w-full flex-col"}>
                                    <FormLabel
                                        title={'Title'}
                                        errors={errors.title}
                                        touched={touched.title}
                                    />
                                    <Input
                                        label={'Title'}
                                        errors={errors.title}
                                        touched={touched.title}
                                        onChange={e => setFieldValue("title", e.target.value)}
                                        onBlur={handleBlur}
                                        name="title"
                                        value={values.title}
                                        disabled={isSubmitting}
                                        placeholder="Rent, Utilities, etc."
                                    />
                                </div>


                                {/* Amount */}
                                <div className={"flex w-full flex-col"}>
                                    <FormLabel
                                        title={'Amount'}
                                        errors={errors.amount}
                                        touched={touched.amount}
                                    />
                                    <Input
                                        label={'Amount'}
                                        errors={errors.amount}
                                        touched={touched.amount}
                                        onChange={e => setFieldValue("amount", e.target.value)}
                                        onBlur={handleBlur}
                                        name="amount"
                                        value={values.amount}
                                        disabled={isSubmitting}
                                        placeholder="0.00"
                                        type="tel"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>
                                        {values.isRecurring ? "Start Date" : "Date"}
                                    </Label>
                                    <Popover open={openDate} onOpenChange={setOpenDate}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="justify-start text-left font-normal"
                                                disabled={isSubmitting}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {values.date ? FormattedDate2(values.date) : "Select a date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={values.date}
                                                onSelect={(date) => {
                                                    setFieldValue("date", date)
                                                    setOpenDate(false)
                                                }}
                                                disabled={isSubmitting}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>


                                {/* Recurring */}
                                <div className={cn("flex justify-between items-center gap-2")}>
                                    <Label htmlFor="recurring">Recurring</Label>
                                    <Switch
                                        id="recurring"
                                        checked={values.isRecurring}
                                        onCheckedChange={(checked) => setFieldValue("isRecurring", checked)}
                                        disabled={isSubmitting}
                                    />

                                </div>

                                {values.isRecurring &&

                                    <div className={"flex flex-col"}>

                                        <div className="flex flex-col gap-2">
                                            {!toggleNoEndDate &&
                                                <>
                                                    <Label>End Date</Label>
                                                    <Popover open={openEndDate} onOpenChange={setOpenEndDate}>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className="justify-start text-left font-normal"
                                                                disabled={isSubmitting}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {values.endDate ? FormattedDate2(values.endDate) : "Select a date"}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={values.endDate}
                                                                onSelect={(date) => {
                                                                    setFieldValue("endDate", date)
                                                                    setOpenEndDate(false)
                                                                }}
                                                                disabled={isSubmitting}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </>
                                            }

                                            <div className="flex items-center justify-between mt-2 ml-auto">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="no-end-date"
                                                        checked={toggleNoEndDate}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setFieldValue("endDate", "")
                                                            }
                                                            setToggleNoEndDate(!toggleNoEndDate)
                                                        }}
                                                        disabled={isSubmitting}
                                                    />
                                                    <Label htmlFor="no-end-date" className="text-sm">
                                                        No end date
                                                    </Label>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="frequency">Frequency</Label>
                                            <Select
                                                value={values.frequency}
                                                onValueChange={(value) =>
                                                    setFieldValue("frequency", value)
                                                }
                                                disabled={isSubmitting}
                                            >
                                                <SelectTrigger className="bg-muted">
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="monthly">Monthly</SelectItem>
                                                    <SelectItem value="quarterly">Quarterly</SelectItem>
                                                    <SelectItem value="yearly">Yearly</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                    </div>
                                }


                                {/* Description */}
                                <div className={"flex w-full flex-col !mt-6"}>

                                    <div className="flex justify-between items-center">
                                        <FormLabel
                                            title={'Decription'}
                                            errors={errors.description}
                                            touched={touched.description}
                                        />
                                        <Switch
                                            className={"-mt-2"}
                                            id="description"
                                            checked={toggleDescription}
                                            disabled={isSubmitting}
                                            onCheckedChange={(checked) => {
                                                if (!checked) {
                                                    setFieldValue("description", "")
                                                }
                                                settoggleDescription(!toggleDescription)
                                            }}
                                        />
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {toggleDescription &&
                                            <motion.div
                                                className="mt-1"
                                                initial={{ y: 5, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
                                                exit={{ y: 5, opacity: 0, transition: { duration: 0.3 } }}
                                            >
                                                <Textarea
                                                    label={'Description'}
                                                    errors={errors.description}
                                                    touched={touched.description}
                                                    onChange={e => setFieldValue("description", e.target.value)}
                                                    onBlur={handleBlur}
                                                    name="description"
                                                    value={values?.description}
                                                    disabled={isSubmitting}
                                                    placeholder="Payment for..."
                                                />
                                            </motion.div>
                                        }
                                    </AnimatePresence>
                                </div>

                                <Button type="submit">
                                    {isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </Form>
                        )}
                    </Formik>

                </DialogContent>
            </Dialog>
        </>
    )
}

export default EditItem