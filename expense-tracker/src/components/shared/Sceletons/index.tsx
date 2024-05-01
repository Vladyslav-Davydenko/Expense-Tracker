import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export const TableSceleton = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-6 gap-4 mb-8">
        <div className="flex-1 col-span-2">
          <div className="mb-4 relative flex justify-center items-center">
            <img
              src="/assets/icons/search.svg"
              alt="search"
              className="w-[20px] h-[20px] absolute left-2"
            />
            <Input
              className="bg-primary border-0 pl-8"
              placeholder="Search Transactions"
            />
          </div>
        </div>
        <div>
          <Button
            variant="ghost"
            role="combobox"
            className="w-[100px] justify-between bg-primary hover:bg-primary-light"
          >
            <img
              src="/assets/icons/filter.svg"
              alt="filter"
              className="w-[20px] h-[20px]"
            />
            Filter
          </Button>
        </div>
        <div className="col-span-2" />
        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            className="bg-primary hover:bg-primary-light text-md"
          >
            Create new expense
          </Button>
        </div>
      </div>
      <Skeleton className="w-[100%] h-[85%] rounded-sm bg-primary" />
      <div className="flex justify-center items-center mt-4">
        <div className="pointer-events-none text-gray-300 mr-2 md:mr-4 p-2 rounded-md border-white border">
          <img
            src="/assets/icons/arrow-left.svg"
            alt="previous"
            className="w-[20px] h-[20px]"
          />
        </div>

        <div className="flex -space-x-px gap-2">
          <Skeleton className="h-10 w-10 rounded-md bg-primary " />
          <Skeleton className="h-10 w-10 rounded-md bg-primary " />
          <Skeleton className="h-10 w-10 rounded-md bg-primary " />
        </div>
        <div className="pointer-events-none text-gray-300 ml-2 md:ml-4 p-2 rounded-md border-white border">
          <img
            src="/assets/icons/arrow-right.svg"
            alt="next"
            className="w-[20px] h-[20px]"
          />
        </div>
      </div>
    </div>
  );
};

export const TableDashBoardSceleton = () => {
  return (
    <div className="container mx-auto py-10 px-8">
      <Skeleton className="w-[460px] h-[260px] rounded-sm bg-primary" />
    </div>
  );
};

export const ProfileSceleton = () => {
  return (
    <div className="flex items-center space-x-4 p-3">
      <Skeleton className="h-12 w-12 rounded-full bg-primary-dark" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px] bg-primary-dark" />
        <Skeleton className="h-4 w-[70px] bg-primary-dark" />
      </div>
    </div>
  );
};

export const TypeChoiceSceleton = () => {
  return <Skeleton className="h-[40px] w-[200px] rounded-md bg-primary" />;
};
