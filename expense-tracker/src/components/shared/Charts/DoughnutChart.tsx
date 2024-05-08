import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { IExpenses, IType } from "@/types";

interface DoughnutChartProps {
  expenses: IExpenses[];
  types: IType[];
}

const DoughnutChart = ({ expenses, types }: DoughnutChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  const expensesSums: Record<string, number> = {};

  expenses.map((expense) => {
    if (!expensesSums[expense.type.name])
      expensesSums[expense.type.name] = expense.amount / 100;
    else expensesSums[expense.type.name] += expense.amount / 100;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "white",
        },
      },
    },
  };
  const data = {
    labels: Object.keys(expensesSums),
    datasets: [
      {
        label: "Expenses",
        data: Object.values(expensesSums),
        backgroundColor: types.map((type) => type.color),
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
