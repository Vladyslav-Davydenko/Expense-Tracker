import { IColumnFilters } from "@/components/ui/data-table";

import { useGetTypes } from "@/lib/react-query/QueriesAndMuntations";

import { cn } from "@/lib/utils";

import { Check, ChevronsUpDown } from "lucide-react";
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
import { useState } from "react";

interface TypeFiltersProps {
  columnFilters: IColumnFilters[];
  setColumnFilters: React.Dispatch<React.SetStateAction<IColumnFilters[]>>;
}

export default function TypeFilter({
  columnFilters,
  setColumnFilters,
}: TypeFiltersProps) {
  const { data: types } = useGetTypes();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between hover:bg-primary"
        >
          "Select Type..."
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-primary border-primary-dark">
        <Command>
          <CommandInput placeholder="Search types..." />
          <CommandEmpty>No types found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {types?.map((type) => (
                <CommandItem
                  key={type.$id}
                  value={type.name}
                  onSelect={() => {
                    setColumnFilters((prev) => {
                      const types = prev.find(
                        (filter) => filter.id === "type_name"
                      )?.value as string[];
                      if (!types) {
                        return prev.concat({
                          id: "type_name",
                          value: [type.name],
                        });
                      }

                      return prev.map((f) => {
                        if (f.id === "status") {
                          return {
                            ...f,
                            value: types.includes(type.name)
                              ? types.filter((t) => t !== type.name)
                              : types.concat(type.name),
                          };
                        } else {
                          return f;
                        }
                      });
                    });
                  }}
                  className=" cursor-pointer hover:bg-primary-light"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      columnFilters.find((cf) => cf.value === type.name)
                        ? "opacity-100"
                        : "opacity-0"
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
