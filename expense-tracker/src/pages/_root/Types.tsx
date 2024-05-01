import TypessTable from "@/components/shared/Types/TypesTable";
import { useGetTypes } from "@/lib/react-query/QueriesAndMuntations";

import { Input } from "@/components/ui/input";

const Types = () => {
  const { data: types, isLoading: isTypesLoading } = useGetTypes();
  return (
    <div className="container py-10 h-dvh">
      <h2 className=" text-xl font-semibold tracking-wider uppercase mb-10">
        Types Table
      </h2>
      <div className="flex justify-center items-center gap-10">
        <div className="w-full h-[400px] border border-white rounded-md flex flex-col p-4 justify-center items-center">
          <label htmlFor="type-name" hidden>
            Name
          </label>
          <Input
            id="type-name"
            className="text-primary-dark"
            type="text"
            placeholder="Name"
          />
        </div>
        <TypessTable types={types || []} isLoading={isTypesLoading} />
      </div>
    </div>
  );
};

export default Types;
