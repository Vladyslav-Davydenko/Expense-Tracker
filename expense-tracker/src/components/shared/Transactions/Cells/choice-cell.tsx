import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  useGetTypes,
  useUpdateExpenses,
} from "@/lib/react-query/QueriesAndMuntations";

import { IExpenses } from "@/types";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
import { Column, Row } from "@tanstack/react-table";
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
  getValue: () => unknown;
  row: Row<IExpenses>;
  column: Column<IExpenses>;
}

export default function ChoiceCell({ getValue, row }: EditableCellProps) {
  const initialValue = getValue();

  const { toast } = useToast();
  const isMounted = useRef(false);
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const { data: types, isLoading: isTypesFetching } = useGetTypes();
  const { mutateAsync: updateExpense } = useUpdateExpenses();

  useEffect(() => {
    if (isMounted.current) handleChange();
    else isMounted.current = true;
  }, [value]);

  const defaultCell = (
    <Button
      variant="ghost"
      role="combobox"
      className="w-full max-w-[200px] justify-between hover:bg-primary"
    >
      {value && row.original.type?.name ? (
        <div className="flex gap-2 justify-start items-center">
          <div
            className="w-[16px] h-[16px]"
            style={{ backgroundColor: row.original.type?.color ?? "white" }}
          ></div>
          {row.original.type?.name ?? ""}
        </div>
      ) : (
        "Select Type..."
      )}
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  const handleChange = async () => {
    const newExpense = {
      id: row.original.$id,
      data: { type: types?.find((type) => type.name === value)?.$id || "" },
    };

    const expense = await updateExpense(newExpense);

    if (!expense) {
      return toast({
        title: "Update failed. Please try again.",
      });
    }

    return toast({
      title: "Update successed.",
    });
  };

  if (isTypesFetching || !types) {
    return defaultCell;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full max-w-[200px] justify-between hover:bg-primary"
        >
          {value ? (
            <div className="flex gap-2 justify-start items-center">
              <div
                className="w-[16px] h-[16px] overflow-hidden"
                style={{
                  backgroundColor:
                    types.find((type) => type.name === value)?.color ?? "white",
                }}
              ></div>
              {types.find((type) => type.name === value)?.name}
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
                  className=" cursor-pointer hover:bg-primary-light"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === type.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div
                    className="w-[16px] h-[16px] mr-2"
                    style={{ backgroundColor: type.color }}
                  ></div>
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
