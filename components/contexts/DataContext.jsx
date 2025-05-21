"use client"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { client, COLLECTION_ID_ITEMS, DATABASE_ID, teams } from "../appwrite/appwrite";
import { useAuth } from "@/components/contexts/AuthContext";
import { db } from "../appwrite/database";
import { Query } from "appwrite";
import Loader from "../loaders/loader";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([])
    const [defaultItems, setDefaultItems] = useState([])
    const [loading, setLoading] = useState(true)

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState({});
    const [sumOfPayments, setSumOfPayments] = useState(0)
    const [sumOfIncomes, setSumOfIncomes] = useState(0)

    const paidKey = `${String(currentMonth.month).padStart(2, "0")}-${currentMonth.year}`


    useEffect(() => {
        setCurrentMonth({
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        })
    }, [])


    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await db.items.list([
                    Query.orderDesc("$createdAt"),
                    // Query.limit(1000)
                ]);

                setDefaultItems(response.documents)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
        getItems()
    }, [])


    // Realtime. Re-populate documents when created.
    useEffect(() => {
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_ITEMS}.documents`, (response) => {
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                setDefaultItems(prev => [response.payload, ...prev])
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                setDefaultItems(prev => prev.filter(item => item.$id !== response.payload.$id))
            }
            if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                setDefaultItems(prev => {
                    // Find the index of the item to update
                    const index = prev.findIndex(item => item.$id === response.payload.$id);
                    if (index !== -1) {
                        // Create a new array with the updated item
                        const updatedItems = [...prev];
                        updatedItems[index] = response.payload; // Assuming response.payload contains the updated document data
                        return updatedItems;
                    }
                    return prev;
                });
            }
        });

        return () => unsubscribe()
    }, []);

    useEffect(() => {
        const { year, month } = currentMonth;

        // 1) Filter items as before
        const filtered = defaultItems.filter(item => {
            const start = new Date(item.date);
            const startY = start.getFullYear();
            const startM = start.getMonth() + 1;

            const hasEnd = Boolean(item.endDate);
            const end = hasEnd ? new Date(item.endDate) : null;
            const endY = hasEnd ? end.getFullYear() : null;
            const endM = hasEnd ? end.getMonth() + 1 : null;

            const startsBeforeOrIn =
                startY < year ||
                (startY === year && startM <= month);

            if (item.isRecurring) {
                if (hasEnd) {
                    const endsAfterOrIn =
                        endY > year ||
                        (endY === year && endM >= month);
                    return startsBeforeOrIn && endsAfterOrIn;
                }
                return startsBeforeOrIn;
            }

            // non-recurring
            return startY === year && startM === month;
        });

        // 2) Sort: payments first, then incomes; within each group unpaid→paid, newest→oldest
        const sorted = filtered.sort((a, b) => {
            // a) always put income at the bottom
            if (a.type !== b.type) {
                return a.type === 'income' ? 1 : -1;
            }
            // b) unpaid before paid
            if (a.isPaid !== b.isPaid) {
                return a.isPaid ? 1 : -1;
            }
            // c) newest first
            return new Date(b.date) - new Date(a.date);
        });

        // 3) Update state
        setItems(sorted);

        // 4) Recompute sums
        const sumOfPayments = sorted
            .filter(item => item.type === "payment" && item.isPaid && item.paidMonths.includes(paidKey))
            .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);
        setSumOfPayments(sumOfPayments);

        const sumOfIncomes = sorted
            .filter(item => item.type === "income" && item.paidMonths.includes(paidKey))
            .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);
        setSumOfIncomes(sumOfIncomes);

    }, [currentMonth, defaultItems]);






    const values = {
        items,
        currentMonth,
        setCurrentMonth,
        sumOfIncomes,
        sumOfPayments,
        paidKey
    };

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);


