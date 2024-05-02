import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useDeleteType } from "@/lib/react-query/QueriesAndMuntations";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmToDeleteTypeProps {
  id: string;
}

const ConfirmToDeleteType = ({ id }: ConfirmToDeleteTypeProps) => {
  const { mutateAsync: deleteType } = useDeleteType();
  const { toast } = useToast();
  const handleDeleteButtonClick = async () => {
    const result = await deleteType(id);
    if (!result)
      return toast({
        title: "Deletion failed. Please try again.",
      });

    return toast({
      title: "Deleted successfully.",
    });
  };
  return (
    <Dialog>
      <div className="flex justify-end items-center">
        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-md bg-primary">
          <DialogTrigger>
            <img
              src="/assets/icons/cross.svg"
              alt="delete"
              className="w-[20px] h-[20px]"
            />
          </DialogTrigger>
        </div>
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
          onClick={handleDeleteButtonClick}
          className=" text-red-500 font-semibold tracking-wider uppercase pt-4"
        >
          Delete
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmToDeleteType;
