import LineChartTypes from "@/components/shared/Charts/LineChartTypes";
import {
  useGetExpenses,
  useGetTypes,
} from "@/lib/react-query/QueriesAndMuntations";

const Statistics = () => {
  const { data: types, isLoading: isTypesLoading } = useGetTypes();
  const { data: expenses, isLoading: isExpensesLoading } = useGetExpenses();

  return (
    <div className="container py-10 h-dvh">
      <h2 className=" text-xl font-semibold tracking-wider uppercase mb-20">
        Statistics
      </h2>
      <div className="flex justify-center items-center gap-10">
        <div className="rounded-md bg-primary shadow-md flex-1 h-[400px]">
          <LineChartTypes types={types || []} expenses={expenses || []} />
        </div>
        <div>Income complex Bar Chart here</div>
      </div>
    </div>
  );
};

export default Statistics;
