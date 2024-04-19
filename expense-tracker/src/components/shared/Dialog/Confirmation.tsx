import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface ConfirmationProps {
  action: () => void;
}

const Confirmation = ({ action }: ConfirmationProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <img
          src="/assets/icons/cross.svg"
          alt="delete"
          className="w-[20px] h-[20px]"
        />
      </DialogTrigger>
      <DialogContent className="bg-primary border-0">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-4">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogClose
          onClick={action}
          className=" text-red-500 font-semibold tracking-wider uppercase pt-4"
        >
          Delete
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default Confirmation;
