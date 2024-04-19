import { useEffect, useState } from "react";
import { useToast } from "./use-toast";

import { useUpdateExpenses } from "@/lib/react-query/QueriesAndMuntations";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePicker } from "./time-picker";
import { IExpenses } from "@/types";

interface DateTimePickerProps {
  initialDate: Date;
  expense: IExpenses;
}

export function DateTimePicker({ initialDate, expense }: DateTimePickerProps) {
  const [date, setDate] = useState<Date>();
  const { mutateAsync: updateExpense } = useUpdateExpenses();
  const { toast } = useToast();

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    handleDateUpdate();
  }, [date]);

  const handleDateUpdate = useDebouncedCallback(async () => {
    if (!date || date.getTime() === initialDate.getTime()) return;

    const newExpense = {
      ...expense,
      date: date.toISOString(),
    };

    const res = await updateExpense(newExpense);

    if (!res) {
      return toast({
        title: "Update failed. Please try again.",
      });
    }

    return toast({
      title: "Update successed.",
    });
  }, 1000);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-0 hover:bg-primary",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-primary border-primary-dark">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePicker setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
