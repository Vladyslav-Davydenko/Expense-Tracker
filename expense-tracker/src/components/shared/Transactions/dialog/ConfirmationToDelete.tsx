import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useDeleteExpenses } from "@/lib/react-query/QueriesAndMuntations";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmationToDeleteProps {
  id: string;
}

const ConfirmationToDelete = ({ id }: ConfirmationToDeleteProps) => {
  const { mutateAsync: deleteExpenses } = useDeleteExpenses();
  const { toast } = useToast();
  const handleRemoveButtonClick = async () => {
    const result = await deleteExpenses(id);

    if (!result) {
      return toast({
        title: "Deletion failed. Please try again.",
      });
    }

    return toast({
      title: "Deleted successfully.",
    });
  };
  return (
    <Dialog>
      <div className="flex justify-end items-center">
        <DialogTrigger>
          <img
            src="/assets/icons/cross.svg"
            alt="delete"
            className="w-[20px] h-[20px]"
          />
        </DialogTrigger>
      </div>
      <DialogContent className="bg-primary border-0">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-4">
            This action cannot be undone. This will permanently delete your
            transaction and remove this data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogClose
          onClick={handleRemoveButtonClick}
          className=" text-red-500 font-semibold tracking-wider uppercase pt-4"
        >
          Delete
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationToDelete;
