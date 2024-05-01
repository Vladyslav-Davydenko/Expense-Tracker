import { useState } from "react";
import { TwitterPicker } from "react-color";

import { useGetTypes } from "@/lib/react-query/QueriesAndMuntations";

import TypessTable from "@/components/shared/Types/TypesTable";
import { Input } from "@/components/ui/input";

import { INewType } from "@/types";
import { Button } from "@/components/ui/button";

const defaultValueType = {
  $id: "",
  name: "",
  color: "#fff",
};

const Types = () => {
  const { data: types, isLoading: isTypesLoading } = useGetTypes();
  const [type, setType] = useState<INewType & { $id?: string }>(
    defaultValueType
  );

  const handleButtonClick = () => {
    console.log({ type });
  };

  const handleClearData = () => {
    setType(defaultValueType);
  };
  return (
    <div className="container py-10 h-dvh">
      <h2 className=" text-xl font-semibold tracking-wider uppercase mb-10">
        Types Table
      </h2>
      <div className="flex justify-center items-center gap-10">
        <div className=" h-[400px] rounded-md flex flex-col gap-6 p-4 justify-center items-center">
          <label htmlFor="type-name" hidden>
            Name
          </label>
          <div className="flex gap-2 justify-center items-center w-full">
            <Input
              id="type-name"
              className="text-primary-dark flex-1"
              type="text"
              placeholder="Name"
              value={type?.name ?? ""}
              onChange={(e) => setType({ ...type, name: e.target.value })}
            />
            <div className=" w-10 h-10 rounded-md flex justify-center items-center border border-white transition-all">
              <div
                className="w-[16px] h-[16px] overflow-hidden border border-white"
                style={{
                  backgroundColor: type?.color ?? "white",
                }}
              ></div>
            </div>
          </div>
          <TwitterPicker
            triangle="top-right"
            color={type?.color ?? "#fff"}
            onChange={(color) => setType({ ...type, color: color.hex })}
          />
          <div className="flex justify-between items-center w-full">
            <Button onClick={handleClearData}>Clear</Button>
            <Button onClick={handleButtonClick}>
              {type.$id ? "Update" : "Create"}
            </Button>
          </div>
        </div>
        <TypessTable
          types={types || []}
          isLoading={isTypesLoading}
          setType={setType}
        />
      </div>
    </div>
  );
};

export default Types;
