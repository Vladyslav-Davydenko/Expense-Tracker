import { INewType, IType } from "@/types";
import { columns } from "./columns/types-columns";
import DataTableTypes from "@/components/ui/data-table-types";

interface TypesTableProps {
  types: IType[];
  isLoading: boolean;
  setType: React.Dispatch<React.SetStateAction<INewType & { $id?: string }>>;
}

export default function TypessTable({
  types,
  isLoading,
  setType,
}: TypesTableProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="w-full">
      <DataTableTypes
        columns={columns}
        data={types}
        isNotDashboard={true}
        setType={setType}
      />
    </div>
  );
}
