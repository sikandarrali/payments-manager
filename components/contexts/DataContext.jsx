"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { client, COLLECTION_ID_ITEMS, DATABASE_ID } from "../appwrite/appwrite";
import { db } from "../appwrite/database";
import { Query } from "appwrite";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [defaultItems, setDefaultItems] = useState([]);
    const [, setLoading] = useState(true);

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

        // Helper function to safely parse and extract year/month from a date string
        // Handles timezone issues by parsing ISO date strings directly when possible
        const getYearMonth = (dateStr) => {
            if (!dateStr) return null;
            
            try {
                // If it's already a Date object, convert to ISO string first
                let dateValue = dateStr instanceof Date ? dateStr.toISOString() : dateStr;
                
                // Try to parse ISO date string directly (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)
                // This avoids timezone conversion issues
                if (typeof dateValue === 'string') {
                    // Match ISO date format: YYYY-MM-DD
                    const isoDateMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
                    if (isoDateMatch) {
                        return {
                            year: parseInt(isoDateMatch[1], 10),
                            month: parseInt(isoDateMatch[2], 10)
                        };
                    }
                }
                
                // Fallback: parse as Date and use UTC methods to avoid timezone issues
                const date = dateStr instanceof Date ? dateStr : new Date(dateStr);
                
                // Check if date is valid
                if (isNaN(date.getTime())) {
                    console.warn('Invalid date:', dateStr);
                    return null;
                }
                
                // Use UTC methods to get consistent year/month regardless of timezone
                return {
                    year: date.getUTCFullYear(),
                    month: date.getUTCMonth() + 1
                };
            } catch (error) {
                console.warn('Error parsing date:', dateStr, error);
                return null;
            }
        };

        const isInMonth = (dateStr) => {
            const dateInfo = getYearMonth(dateStr);
            if (!dateInfo) return false;
            return dateInfo.year === year && dateInfo.month === month;
        };

        const filtered = defaultItems.filter(item => {
            // Validate that item has a date
            if (!item.date) {
                console.warn('Item missing date:', item.$id);
                return false;
            }

            const startInfo = getYearMonth(item.date);
            if (!startInfo) return false;

            const startsBeforeOrIn = startInfo.year < year || 
                                    (startInfo.year === year && startInfo.month <= month);

            if (item.isRecurring) {
                if (item.endDate) {
                    const endInfo = getYearMonth(item.endDate);
                    if (!endInfo) {
                        // If endDate is invalid but recurring, treat as no end date
                        return startsBeforeOrIn;
                    }
                    const endsAfterOrIn = endInfo.year > year || 
                                        (endInfo.year === year && endInfo.month >= month);
                    return startsBeforeOrIn && endsAfterOrIn;
                }
                // No end date - show if started before or in current month
                return startsBeforeOrIn;
            }

            // Non-recurring: only show if date is in current month
            return isInMonth(item.date);
        });

        const sorted = [...filtered].sort((a, b) => {
            if (a.type !== b.type) return a.type === "income" ? 1 : -1;
            const aPaid = a.paidMonths?.includes(paidKey);
            const bPaid = b.paidMonths?.includes(paidKey);
            if (aPaid !== bPaid) return aPaid ? 1 : -1;
            return new Date(a.date).getDate() - new Date(b.date).getDate();
        });

        setItems(sorted);

        const sum = (filterFn) =>
            sorted
                .filter(filterFn)
                .reduce((sum, { amount }) => sum + (parseFloat(amount) || 0), 0);

        setSumOfPayments(sum(item => item.type === "payment" && item.paidMonths?.includes(paidKey)));
        setSumOfIncomes(sum(item => item.type === "income"));
        setSumOfStillDue(sum(item => item.type === "payment" && !item.paidMonths?.includes(paidKey)));
        setSumOfTotalExpense(sum(item => item.type === "payment"));

    }, [currentMonth, defaultItems, paidKey]);


    const values = {
        items,
        currentMonth,
        setCurrentMonth,
        sumOfIncomes,
        sumOfStillDue,
        sumOfPayments,
        sumOfTotalExpense,
        paidKey,
        defaultItems
    };

    return (
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
