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
  TooltipItem,
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

  const expensesSums: Record<string, number> = { others: 0 };
  const currentMonth = new Date().getMonth();

  expenses.map((expense) => {
    if (!expense || !expense?.isSpent) return;

    if (!expense?.type?.name && expense?.amount) {
      expensesSums["others"] += expense.amount;
      return;
    }
    const expenseMonth = new Date(expense.date).getMonth();
    if (currentMonth !== expenseMonth || !expense.isSpent) return;
    if (!expensesSums[expense.type.name])
      expensesSums[expense.type.name] = expense.amount;
    else expensesSums[expense.type.name] += expense.amount;
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
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed) {
              label += "$" + context.parsed / 100;
            }
            return label;
          },
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
        backgroundColor: Object.keys(expensesSums).map((key) => {
          const exists = types.find((type) => type.name === key);
          return exists?.color ?? "gray";
        }),
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut options={options} data={data} className="p-4" />;
};

export default DoughnutChart;
