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
import { filterExpensesOtherFormat } from "@/lib/utils";

interface BarChartExtendedProps {
  expenses: IExpenses[];
  types: IType[];
}

const BarChartExtended = ({ expenses, types }: BarChartExtendedProps) => {
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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const preparedData = filterExpensesOtherFormat(
    expenses,
    types,
    currentYear,
    false
  );

  console.log(preparedData);

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
        stacked: true,
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
        stacked: true,
        ticks: {
          color: "white",
        },
      },
    },
  };
  const data = {
    labels: months.slice(0, currentMonth + 1),
    datasets: Object.keys(preparedData).map((typeName) => {
      return {
        label: typeName,
        data: Object.values(preparedData[typeName]).map(
          (amount) => amount / 100
        ),
        backgroundColor:
          types.find((type) => type.name === typeName)?.color || "gray",
        borderColor: "white",
        borderWidth: 0,
      };
    }),
  };

  return <Bar options={options} data={data} />;
};

export default BarChartExtended;
