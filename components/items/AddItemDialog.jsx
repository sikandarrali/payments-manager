import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import FormLabel from "@/components/theme/FormLabel";
import { ItemSchema } from "@/lib/schemas/ItemSchema";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { FormattedDateForCalenderDatePick } from "@/lib/FormattedDateForCalendarPick";
import { Form, Formik } from "formik";
import { useState } from "react"
import { cn, scrollToTop } from "@/lib/utils"
import { Button } from "../ui/button"
import { CalendarIcon } from "lucide-react"
import { COLLECTION_ID_ITEMS, DATABASE_ID, databases } from "../appwrite/appwrite"
import { ID } from "node-appwrite"
import { toast } from "react-toastify"
import { ToastOptions } from "@/lib/ToastOptions"
import { useI18n } from "@/locales/client"
import TypeTabs from "./TypeTabs"
import { UISheet } from "../theme/UISheet"


const AddItemDialog = ({ isOpen, setisOpen }) => {

    const t = useI18n()

    const [submittingForm, setSubmittingForm] = useState(false)

    const [activeType, setActiveType] = useState('payment')

    const [toggleDescription, settoggleDescription] = useState(false)
    const [toggleNoEndDate, setToggleNoEndDate] = useState(false)

    const [openDate, setOpenDate] = useState("")
    const [openEndDate, setOpenEndDate] = useState("")

    const handleSave = (values, isSubmitting) => {

        const tempValues = { ...values, type: activeType }

        const response = databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID_ITEMS,
            ID.unique(),
            tempValues,
        );
        response.then(function (response) {
            toast.success(t("alerts.added"), ToastOptions);
            setisOpen(false)
            scrollToTop()
        }, function (error) {
            toast.error(t('alerts.exception'), ToastOptions);
            console.log(error)
        }).finally(() => {
            setSubmittingForm(false)
        });
    }

    return (

        <UISheet
            open={isOpen}
            onOpenChange={setisOpen}
        >

            <div className="flex items-center mb-10 gap-4">
                <span className="font-medium text-lg">Add New</span>
                <TypeTabs activeTab={activeType} setActiveTab={setActiveType} />
            </div>


            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    amount: "",
                    date: new Date(),
                    endDate: "",
                    frequency: "",
                    isRecurring: false,
                    isPaid: false,
                }}
                validationSchema={ItemSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmittingForm(true)
                    handleSave(values, setSubmitting)
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
                                placeholder={activeType === "payment" ? "Rent, Utilities, etc." : "Salary etc."}
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
                            <FormLabel
                                title={values.isRecurring ? "Start Date" : "Date"}
                                errors={errors.date}
                                touched={touched.date}
                            />
                            <Popover open={openDate} onOpenChange={setOpenDate}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="justify-start text-left font-normal"
                                        disabled={isSubmitting}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {values.date ? FormattedDateForCalenderDatePick(values.date) : "Select a date"}
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
                                                        {values.endDate ? FormattedDateForCalenderDatePick(values.endDate) : "Select a date"}
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
                                            value={values.description}
                                            disabled={isSubmitting}
                                            placeholder="Payment for..."
                                        />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </div>

                        <Button type="submit">
                            {submittingForm ? 'Saving...' : 'Save'}
                        </Button>
                    </Form>
                )}
            </Formik>

        </UISheet>

    )
}

export default AddItemDialog