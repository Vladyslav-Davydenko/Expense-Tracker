import BarChartExtended from "@/components/shared/Charts/BarChartExtended";
import IncomeExpenseData from "@/components/shared/Statistics/IncomeExpenseData";
import LineChartTypes from "@/components/shared/Charts/LineChartTypes";
import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

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
        <IncomeExpenseData expenses={expenses || []} />
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
