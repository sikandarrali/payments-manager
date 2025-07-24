"use client"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { client, COLLECTION_ID_ITEMS, DATABASE_ID, teams } from "../appwrite/appwrite";
import { useAuth } from "@/components/contexts/AuthContext";
import { db } from "../appwrite/database";
import { Query } from "appwrite";
import Loader from "../loaders/loader";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [defaultItems, setDefaultItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState({
        month: today.getMonth() + 1,
        year: today.getFullYear(),
    });
    const [sumOfPayments, setSumOfPayments] = useState(0);
    const [sumOfTotalExpense, setSumOfTotalExpense] = useState(0);
    const [sumOfStillDue, setSumOfStillDue] = useState(0);
    const [sumOfIncomes, setSumOfIncomes] = useState(0);

    const paidKey = `${String(currentMonth.month).padStart(2, "0")}-${currentMonth.year}`;

    useEffect(() => {
        const getItems = async () => {
            try {
                const response = await db.items.list([
                    Query.orderDesc("$createdAt"),
                ]);

                setDefaultItems(response.documents);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getItems();
    }, []);

    useEffect(() => {
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_ITEMS}.documents`, (response) => {
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                setDefaultItems(prev => [response.payload, ...prev]);
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                setDefaultItems(prev => prev.filter(item => item.$id !== response.payload.$id));
            }
            if (response.events.includes("databases.*.collections.*.documents.*.update")) {
                setDefaultItems(prev => {
                    const index = prev.findIndex(item => item.$id === response.payload.$id);
                    if (index !== -1) {
                        const updatedItems = [...prev];
                        updatedItems[index] = response.payload;
                        return updatedItems;
                    }
                    return prev;
                });
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const { year, month } = currentMonth;

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

            return startY === year && startM === month;
        });

        const sorted = filtered.sort((a, b) => {
            if (a.type !== b.type) {
                return a.type === 'income' ? 1 : -1;
            }
            const aIsPaid = a.paidMonths?.includes(paidKey);
            const bIsPaid = b.paidMonths?.includes(paidKey);
            if (aIsPaid !== bIsPaid) {
                return aIsPaid ? 1 : -1;
            }
            const aDay = new Date(a.date).getDate();
            const bDay = new Date(b.date).getDate();
            return aDay - bDay;
        });

        setItems(sorted);

        const sumOfPayments = sorted
            .filter(item => item.type === "payment" && item.paidMonths?.includes(paidKey))
            .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);
        setSumOfPayments(sumOfPayments);

        const sumOfIncomes = sorted
            .filter(item => item.type === "income")
            .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);
        setSumOfIncomes(sumOfIncomes);

        const sumOfStillDue = sorted
            .filter(item => item.type === "payment" && !item.paidMonths?.includes(paidKey))
            .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);
        setSumOfStillDue(sumOfStillDue);

        const sumOfTotalExp = sorted
            .filter(item => item.type === "payment")
            .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);
        setSumOfTotalExpense(sumOfTotalExp);

    }, [currentMonth, defaultItems, paidKey]);

    const values = {
        items,
        currentMonth,
        setCurrentMonth,
        sumOfIncomes,
        sumOfStillDue,
        sumOfPayments,
        sumOfTotalExpense,
        paidKey
    };

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
