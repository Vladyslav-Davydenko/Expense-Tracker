import { INewType, IType } from "@/types";
import { columns } from "./columns/types-columns";
import DataTableTypes from "@/components/ui/data-table-types";
import { TypeTableSceleton } from "../Sceletons";

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
    return <TypeTableSceleton />;
  }
  return (
    <div className="w-full">
      <DataTableTypes columns={columns} data={types} setType={setType} />
    </div>
  );
}
