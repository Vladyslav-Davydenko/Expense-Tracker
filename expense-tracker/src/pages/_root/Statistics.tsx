import BarChartExtended from "@/components/shared/Charts/BarChartExtended";
import LineChartTypes from "@/components/shared/Charts/LineChartTypes";
import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

import { ArrowUp, ArrowDown } from "lucide-react";

const Statistics = () => {
  const { data: types } = useGetTypes();
  const { data: expenses } = useGetExpenses();

  return (
    <div className="container py-10 h-dvh">
      <h2 className=" text-xl font-semibold tracking-wider uppercase mb-20">
        Statistics
      </h2>
      <div className="grid grid-cols-2 gap-10 justify-center items-center mb-[150px]">
        <div className="rounded-md bg-primary shadow-md flex-1">
          <p className="p-4 rounded-md bg-primary shadow-md">
            Expenses statistics
          </p>
          <LineChartTypes types={types || []} expenses={expenses || []} />
        </div>
        <div className="rounded-md bg-primary shadow-md flex-1">
          <p className="p-4 rounded-md bg-primary shadow-md">
            Income statistics
          </p>
          <BarChartExtended types={types || []} expenses={expenses || []} />
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="p-4 rounded-md bg-primary shadow-md">
            <p className=" text-sm opacity-80">Largest expense</p>
            <div className="mt-4 flex gap-1 justify-end items-center">
              <p className="text-lg">$1234</p>
              <ArrowDown className=" text-red-500" />
              <span className="text-lg text-red-500 ">12%</span>
            </div>
          </div>
          <div className="p-4 rounded-md bg-primary shadow-md">
            <p className=" text-sm opacity-80">Biggest income</p>
            <div className="mt-4 flex gap-1 justify-end items-center">
              <p className="text-lg">$1234</p>
              <ArrowUp className=" text-green-500" />
              <span className="text-lg text-green-500 ">12%</span>
            </div>
          </div>
          <div className="p-4 rounded-md bg-primary shadow-md">
            <p className=" text-sm opacity-80">Comparison expenses</p>
            <div className="mt-4 flex gap-1 justify-end items-center">
              <p className="text-lg">$1234</p>
              <ArrowDown className=" text-red-500" />
              <span className="text-lg text-red-500 ">12%</span>
            </div>
          </div>
          <div className="p-4 rounded-md bg-primary shadow-md">
            <p className=" text-sm opacity-80">Comparison income</p>
            <div className="mt-4 flex gap-1 justify-end items-center">
              <p className="text-lg">$1234</p>
              <ArrowUp className=" text-green-500" />
              <span className="text-lg text-green-500 ">12%</span>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-primary shadow-md flex-1">
          <p className="p-4 rounded-md bg-primary shadow-md">
            Income statistics
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
