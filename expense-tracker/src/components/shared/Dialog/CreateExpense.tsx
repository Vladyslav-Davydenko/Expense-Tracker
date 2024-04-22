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
import { Input } from "@/components/ui/input";

import { useCreateExpenses } from "@/lib/react-query/QueriesAndMuntations";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { CreateExpenseValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateExpense = () => {
  const { mutateAsync: createExpense } = useCreateExpenses();
  const [spent, setSpent] = useState(true);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateExpenseValidation>>({
    resolver: zodResolver(CreateExpenseValidation),
    defaultValues: {
      type: "",
      amount: 0,
      description: "",
      isSpent: spent,
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateExpenseValidation>) => {
    console.log(values);
    const result = "";
    console.log("created: " + result);

    if (!result) {
      return toast({
        title: "Creation failed. Please try again.",
      });
    }

    return toast({
      title: "Created successfully.",
    });
  };
  return (
    <Dialog>
      <DialogTrigger className="bg-primary hover:bg-primary-light text-white py-2 px-4 rounded-md">
        Create new expense
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
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pl-2">Amount</FormLabel>
                  <FormControl>
                    <Input
                      className="text-primary-dark"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <Button type="submit" className="bg-primary-light">
                Create
              </Button>
              <DialogClose className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-primary-light">
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
