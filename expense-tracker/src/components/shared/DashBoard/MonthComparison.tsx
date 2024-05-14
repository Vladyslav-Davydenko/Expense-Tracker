import { IExpenses, IType } from "@/types";

import BarChart from "../Charts/BarChart";
import { useState } from "react";

interface MonthComparisonProps {
  types: IType[];
  expenses: IExpenses[];
}

const MonthComparison = ({ types, expenses }: MonthComparisonProps) => {
  const [type, setType] = useState<IType>(types[0]);
  return (
    <div className="p-4 rounded-md bg-primary shadow-md">
      <p>Monthly Comparison by Types</p>
      <div className="flex gap-2 mt-10">
        <div className="border-r-2 pr-2 max-h-[400px] overflow-scroll">
          <p>Type List</p>
          <ul className="flex flex-col justify-center items-start mt-4 ">
            {types.map((t) => {
              return (
                <li
                  key={t.$id}
                  className={`flex justify-start items-center gap-2 cursor-pointer hover:bg-primary-light transition-all px-1 py-2 w-full ${
                    type.$id === t.$id ? "bg-primary-light" : " bg-transparent"
                  }`}
                  onClick={() => setType(t)}
                >
                  <div
                    className="w-[16px] h-[16px]"
                    style={{ backgroundColor: t.color ?? "white" }}
                  ></div>
                  {t.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <BarChart expenses={expenses} type={type} />
        </div>
      </div>
    </div>
  );
};

export default MonthComparison;
