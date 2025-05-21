import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ChevronLeft, ChevronRight, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const MONTH_NAMES = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December',
];

/**
 * MonthSwitcher
 * Props:
 * - onChange?: ({ month: string; year: number }) => void
 */
export default function MonthSwitcher({ onChange }) {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    const { currentMonth, setCurrentMonth } = useData();
    const [temp, setTemp] = useState(currentMonth);
    const [open, setOpen] = useState(false);

    const prev = () => {
        setCurrentMonth(({ month, year }) =>
            month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year }
        );
    };

    const next = () => {
        setCurrentMonth(({ month, year }) =>
            month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year }
        );
    };

    const openPicker = () => {
        setTemp(currentMonth);
        setOpen(true);
    };

    const changeYear = (delta) => {
        setTemp(({ month, year }) => ({ month, year: year + delta }));
    };

    const choose = (idx) => {
        const newMonth = idx + 1;
        const chosen = { month: newMonth, year: temp.year };
        setCurrentMonth(chosen);
        setOpen(false);
        if (onChange) onChange({ month: String(newMonth).padStart(2, '0'), year: temp.year });
    };

    return (
        <div className="flex justify-between items-center space-x-2 sticky top-0 bg-background p-6 -mx-6 z-50">
            <Button variant="outline" size="icon" onClick={prev}>
                <ChevronLeft />
            </Button>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex rounded-md overflow-hidden items-center gap-2 font-medium select-none border">
                        <span className="pl-4 pr-2 pointer-events-none">
                            {MONTH_NAMES[currentMonth.month - 1]} {currentMonth.year}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-none border-0 border-l px-2"
                            onClick={openPicker}
                        >
                            <ChevronDown className="w-4 h-4 stroke-[3px]" />
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent align="center" side="bottom" className="w-56 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <Button variant="ghost" size="icon" onClick={() => changeYear(-1)}>
                            <ChevronLeft />
                        </Button>
                        <span className="font-medium">{temp.year}</span>
                        <Button variant="ghost" size="icon" onClick={() => changeYear(1)}>
                            <ChevronRight />
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {MONTH_NAMES.map((name, idx) => {
                            const monthValue = idx + 1;
                            const isSelected = monthValue === currentMonth.month;
                            const isToday = monthValue === todayMonth && temp.year === todayYear;
                            return (
                                <Button
                                    key={name}
                                    variant={isSelected ? 'default' : 'outline'}
                                    size="sm"
                                    className={isToday ? 'border-2 border-primary' : ''}
                                    onClick={() => choose(idx)}
                                >
                                    {name.slice(0, 3)}
                                </Button>
                            );
                        })}
                    </div>
                </PopoverContent>
            </Popover>

            <Button variant="outline" size="icon" onClick={next}>
                <ChevronRight />
            </Button>
        </div>
    );
}