import BarChartExtended from "@/components/shared/Charts/BarChartExtended";
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
      <div className="flex justify-center items-center gap-10">
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
      </div>
    </div>
  );
};

export default Statistics;
