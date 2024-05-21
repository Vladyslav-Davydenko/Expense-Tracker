import { Bar } from "react-chartjs-2";

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
  BarElement,
} from "chart.js";
import { IExpenses, IType } from "@/types";

import { months } from "@/constants";
import { filterExpenses } from "@/lib/utils";

interface BarChartProps {
  expenses: IExpenses[];
  type: IType;
}

const BarChart = ({ expenses, type }: BarChartProps) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    BarElement
  );

  const filteredExpenses = expenses.filter(
    (expense) => expense?.type && expense.type.$id === type.$id
  );

  const currentYear = new Date().getFullYear();
  const preparedData = filterExpenses(filteredExpenses, currentYear);
  // Calculation prepared for charts
  const expensesEachMonthForType = Object.keys(preparedData).map((_, indx) =>
    Object.values(Object.values(preparedData)[indx]).reduce(
      (total, amount) => total + amount,
      0
    )
  );

  const options = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
          boxWidth: 0,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = "";
            if (context.formattedValue !== null) {
              label += " $" + context.formattedValue;
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
          callback: function (
            value: unknown,
            _index: unknown,
            _values: unknown
          ) {
            return "$" + value;
          },
        },
      },
    },
  };
  const data = {
    labels: Object.keys(preparedData).sort(
      (a, b) => months.indexOf(a) - months.indexOf(b)
    ),
    datasets: [
      {
        axis: "y",
        label: `Expenses for ${type.name} in ${currentYear}`,
        data: expensesEachMonthForType.map((t) => t / 100),
        backgroundColor: type.color,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
