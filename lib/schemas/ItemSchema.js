import * as Yup from "yup";

export const ItemSchema = Yup.object().shape({
    title: Yup.string().min(1).max(200, "max200characters").required("required"),
    description: Yup.string().min(1).max(200, "max200characters"),
    amount: Yup.number().required("required"),
    date: Yup.string().required("required"),
    endDate: Yup.string(),
    frequency: Yup.string(),
    isRecurring: Yup.boolean(),
    isPaid: Yup.boolean(),
    type: Yup.string()
});
