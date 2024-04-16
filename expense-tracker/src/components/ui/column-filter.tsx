import { Input } from "./input";

import { IColumnFilters } from "./data-table";

interface setColumnFilters {
  columnFilters: IColumnFilters[];
  setColumnFilters: React.Dispatch<React.SetStateAction<IColumnFilters[]>>;
}

export default function ColumnFilter({
  columnFilters,
  setColumnFilters,
}: setColumnFilters) {
  const taskName =
    columnFilters.find((cf) => cf.id === "description")?.value || "";

  const handleOnChange = (id: string, value: string) =>
    setColumnFilters((prev) =>
      prev
        .filter((cf) => cf.id !== "description")
        .concat({
          id,
          value,
        })
    );

  return (
    <div className="mb-4 relative flex justify-center items-center">
      <img
        src="/assets/icons/search.svg"
        alt="search"
        className="w-[20px] h-[20px] absolute left-2"
      />
      <Input
        className="bg-primary border-0 pl-8"
        placeholder="Search Transactions"
        value={taskName}
        onChange={(e) => handleOnChange("description", e.target.value)}
      />
    </div>
  );
}
