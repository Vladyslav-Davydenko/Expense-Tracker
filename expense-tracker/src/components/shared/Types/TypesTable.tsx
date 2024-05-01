import { IType } from "@/types";
import { columns } from "./columns/types-columns";
import DataTableTypes from "@/components/ui/data-table-types";

interface TypesTableProps {
  types: IType[];
  isLoading: boolean;
}

export default function TypessTable({ types, isLoading }: TypesTableProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-full">
      <DataTableTypes columns={columns} data={types} isNotDashboard={true} />
    </div>
  );
}
