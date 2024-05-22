import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  TooltipItem,
} from "chart.js";
import { IExpenses } from "@/types";

import { months } from "@/constants";

import { filterExpenses } from "@/lib/utils";

interface LineChartProps {
  expenses: IExpenses[];
}

const LineChart = ({ expenses }: LineChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement
  );

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const filteredExpenses = filterExpenses({
    expenses,
    year: currentYear,
    isSpent: true,
  });
  const filteredIncomes = filterExpenses({
    expenses,
    year: currentYear,
    isSpent: false,
  });

  // Calculation prepared for charts
  const expensesEachMonth = Object.keys(filteredExpenses).map((_, indx) =>
    Object.values(Object.values(filteredExpenses)[indx]).reduce(
      (total, amount) => total + amount,
      0
    )
  );
  const incomesEachMonth = Object.keys(filteredIncomes).map((_, indx) =>
    Object.values(Object.values(filteredIncomes)[indx]).reduce(
      (total, amount) => total + amount,
      0
    )
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            let label = "";
            if (context.parsed.y !== null) {
              label += " $" + context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          callback: function (value: unknown) {
            return "$" + value;
          },
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  const data = {
    labels: months.slice(0, currentMonth + 1),
    datasets: [
      {
        label: `Expenses for ${currentYear}`,
        data: expensesEachMonth.map((t) => t / 100),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 2,
      },

      {
        label: `Incomes for ${currentYear}`,
        data: incomesEachMonth.map((t) => t / 100),
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  };
  return <Line data={data} options={options} className=" p-4 " />;
};

export default LineChart;
