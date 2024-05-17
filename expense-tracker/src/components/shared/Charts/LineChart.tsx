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

  const currentYear = new Date().getFullYear();
  const preparedData = filterExpenses(expenses, currentYear, true);
  const incomeData = filterExpenses(expenses, currentYear, false);

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
          label: function (context: any) {
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
          callback: function (
            value: unknown,
            _index: unknown,
            _values: unknown
          ) {
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
    labels: Object.keys(preparedData),
    datasets: [
      {
        label: `Expenses for ${currentYear}`,
        data: Object.keys(preparedData)
          .sort((a, b) => months.indexOf(a) - months.indexOf(b))
          .map((key) => preparedData[key] / 100),
        backgroundColor: "red",
        borderColor: "red",
        borderWidth: 2,
      },

      {
        label: `Incomes for ${currentYear}`,
        data: Object.keys(incomeData)
          .sort((a, b) => months.indexOf(a) - months.indexOf(b))
          .map((key) => incomeData[key] / 100),
        backgroundColor: "green",
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  };
  return <Line data={data} options={options} className=" p-4 " />;
};

export default LineChart;
