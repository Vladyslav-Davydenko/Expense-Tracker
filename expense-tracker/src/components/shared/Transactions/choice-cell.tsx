import { useEffect, useRef, useState } from "react";
import { Column, Row } from "@tanstack/react-table";
import { IExpenses } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  useGetTypes,
  useUpdateExpenses,
} from "@/lib/react-query/QueriesAndMuntations";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EditableCellProps {
  getValue: () => any;
  row: Row<IExpenses>;
  column: Column<IExpenses>;
}

export default function ChoiceCell({ getValue, row }: EditableCellProps) {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue as string);
  const [open, setOpen] = useState(false);
  const isMounted = useRef(false);

  const { data: types, isLoading: isTypesFetching } = useGetTypes();
  const { mutateAsync: updateExpense } = useUpdateExpenses();

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isMounted.current) handleChange();
    else isMounted.current = true;
  }, [value]);

  const defaultCell = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      className="w-[200px] justify-between"
    >
      {value ? (
        <div className="flex gap-2 justify-start items-center">
          <div
            className={`${
              row.original.type?.color ?? "white"
            } w-[16px] h-[16px]`}
          ></div>
          {row.original.type?.name ?? "Test"}
        </div>
      ) : (
        "Select Type..."
      )}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  if (isTypesFetching || !types) {
    return defaultCell;
  }

  const handleChange = async () => {
    const newType = {
      ...row.original.type,
      name: value,
      color: types?.find((type) => type.name === value)?.color ?? "white",
    };

    const newExpense = {
      ...row.original,
      type: newType,
    };

    const expense = await updateExpense(newExpense);

    if (expense) console.log(expense);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? (
            <div className="flex gap-2 justify-start items-center">
              <div
                className={`${
                  types.find((type) => type.name === value)?.color
                } w-[16px] h-[16px]`}
              ></div>
              {`${types.find((type) => type.name === value)?.name}`}
            </div>
          ) : (
            "Select Type..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-primary border-primary-dark">
        <Command>
          <CommandInput placeholder="Search types..." />
          <CommandEmpty>No types found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {types.map((type) => (
                <CommandItem
                  key={type.$id}
                  value={type.name}
                  onSelect={() => {
                    setValue(type.name);
                    setOpen(false);
                  }}
                  className=" cursor-pointer hover:bg-secondary-4"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === type.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className={`${type.color} w-[16px] h-[16px] mr-2`}></div>
                  {type.name}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
