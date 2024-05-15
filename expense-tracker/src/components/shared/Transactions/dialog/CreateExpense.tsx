import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import {
  useCreateExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { CreateExpenseValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateExpense = () => {
  const { mutateAsync: createExpense, isPending: isCreating } =
    useCreateExpenses();
  const { data: types } = useGetTypes();
  const [open, setOpen] = useState(false);
  const [spent, setSpent] = useState(true);
  const [value, setValue] = useState<string>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateExpenseValidation>>({
    resolver: zodResolver(CreateExpenseValidation),
    defaultValues: {
      type: "",
      amount: 1,
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateExpenseValidation>) => {
    const newExpenses = {
      ...values,
      type: value,
      isSpent: spent,
    };

    console.log("INside");

    const result = await createExpense(newExpenses);

    if (!result) {
      return toast({
        title: "Creation failed. Please try again.",
      });
    }

    form.reset();
    setValue("");
    setSpent(true);
    return toast({
      title: "Created successfully.",
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-primary hover:bg-primary-light text-white py-2 px-4 rounded-md text-sm">
        New expense
      </DialogTrigger>
      <DialogContent className="bg-primary border-0">
        <DialogHeader>
          <DialogTitle>Creating New Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-2">Description</FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary-dark"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between min-h-[100px]">
              <FormField
                control={form.control}
                name="type"
                render={() => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pl-2">Type</FormLabel>
                    <FormControl>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full max-w-[200px] justify-between bg-primary-light border border-transparent hover:bg-transparent hover:border-white"
                          >
                            {value ? (
                              <div className="flex gap-2 justify-center items-center">
                                <div
                                  className={`w-[16px] h-[16px]`}
                                  style={{
                                    backgroundColor:
                                      types?.find((type) => type.$id === value)
                                        ?.color ?? "white",
                                  }}
                                ></div>
                                {types?.find((type) => type.$id === value)
                                  ?.name ?? ""}
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
                                {types?.map((type) => (
                                  <CommandItem
                                    key={type.$id}
                                    value={type.name}
                                    onSelect={() => {
                                      setValue(type.$id);
                                      setOpen(false);
                                    }}
                                    className=" cursor-pointer hover:bg-primary-light"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === type.$id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <div
                                      className={`w-[16px] h-[16px] mr-2`}
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-end">
                    <FormLabel className="pr-2">Amount</FormLabel>
                    <div className="flex gap-2">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          onClick={() => setSpent(false)}
                          className={`${
                            spent
                              ? "bg-primary-light"
                              : "bg-primary border border-white"
                          }  w-10 px-2 py-1`}
                        >
                          +
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setSpent(true)}
                          className={`${
                            !spent
                              ? "bg-primary-light"
                              : "bg-primary border border-white"
                          }  w-10 px-2 py-1`}
                        >
                          -
                        </Button>
                      </div>
                      <FormControl>
                        <div className=" flex gap-1 relative">
                          <span
                            className={`${
                              spent
                                ? " text-red-500 left-1"
                                : "text-green-500 left-[2px]"
                            } absolute  h-[100%] flex items-center justify-center`}
                          >
                            {spent ? "-" : "+"}
                          </span>
                          <Input
                            className={`${
                              spent ? " text-red-500" : "text-green-500"
                            } w-[100px]`}
                            type="number"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button
                type="submit"
                className="bg-primary-light border border-transparent hover:bg-transparent hover:border-white "
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create"}
              </Button>
              <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-transparent h-10 px-4 py-2 bg-primary-light border border-transparent  hover:border-white ">
                Close
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExpense;
