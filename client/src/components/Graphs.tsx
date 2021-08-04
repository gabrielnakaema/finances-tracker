import { useState } from 'react';
import { useEffect } from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
  VictoryLabel,
  VictoryPie,
  VictoryTooltip,
} from 'victory';
import getMonth from 'date-fns/getMonth';
import isSameYear from 'date-fns/isSameYear';
import { ImCross } from 'react-icons/im';
import { Entry } from '../types';
import Select from './Select';

interface GraphsProps {
  monthlyData: Entry[];
  allData: Entry[];
  selectedYear: number;
}

interface ByTypeAndCategory {
  [key: string]: ByCategory;
}

interface ByCategory {
  [key: string]: number;
}

interface PieChartLegend {
  name: string;
  active?: boolean;
}

const pieChartColorScale = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
];

const categoriesLabels = {
  stocks: 'Stocks',
  health: 'Health',
  transport: 'Transport',
  mainSalary: 'Main salary',
  housing: 'Housing',
  food: 'Food',
  utilities: 'Utilities',
  savings: 'Savings',
  entertainment: 'Entertainment',
  sideIncome: 'Side income',
  other: 'Other',
} as {
  [key: string]: string;
};

const Graphs = (props: GraphsProps) => {
  const [filterType, setFilterType] = useState('expense');
  const [filterCategories, setFilterCategories] = useState<PieChartLegend[]>(
    []
  );

  useEffect(() => {
    const categories: PieChartLegend[] = [];
    props.monthlyData.forEach((entry) => {
      if (
        entry.type === filterType &&
        !categories.find((el) => el.name === entry.category)
      ) {
        categories.push({
          name: entry.category,
          active: false,
        });
      }
    });
    setFilterCategories(categories);
  }, [props.monthlyData, filterType]);

  const toggleCategory = (category: string) => {
    const newArray = filterCategories.map((element) => {
      if (element.name === category) {
        return {
          name: category,
          active: !element.active,
        };
      } else {
        return element;
      }
    });
    setFilterCategories(newArray);
  };

  const onFilterTypeChange = (text: string) => {
    setFilterType(text);
  };

  const totalsByTypeAndCategory: ByTypeAndCategory = {};
  props.monthlyData.forEach((entry) => {
    if (!(entry.type in totalsByTypeAndCategory)) {
      totalsByTypeAndCategory[entry.type] = {};
    }
    if (!(entry.category in totalsByTypeAndCategory[entry.type])) {
      const total = props.monthlyData.reduce(
        (acc, element) =>
          element.category === entry.category && element.type === entry.type
            ? acc + element.value
            : acc,
        0
      );
      totalsByTypeAndCategory[entry.type][entry.category] = total;
    }
  });
  const dataToPlot = [];
  let totalMonthly = 0;
  if (totalsByTypeAndCategory[filterType]) {
    for (const [key, value] of Object.entries(
      totalsByTypeAndCategory[filterType]
    )) {
      if (
        filterCategories.find((filter) => filter.name === key && filter.active)
      ) {
        dataToPlot.push({
          x: key,
          y: 0,
        });
      } else {
        totalMonthly += value;
        dataToPlot.push({
          x: key,
          y: value,
        });
      }
    }
  }

  const extractMonthlyData = () => {
    const filterDate = new Date(props.selectedYear, 1, 1);
    return props.allData.reduce(
      (acc, entry) => {
        if (isSameYear(entry.date, filterDate)) {
          if (acc[entry.type]) {
            const entryMonth = getMonth(entry.date);
            return {
              ...acc,
              [entry.type]: acc[entry.type].map((el, index) =>
                entryMonth === index
                  ? { ...el, value: el.value + entry.value }
                  : el
              ),
            };
          } else {
            return acc;
          }
        }
        return acc;
      },
      {
        expense: [
          { month: 'Jan', value: 0 },
          { month: 'Feb', value: 0 },
          { month: 'Mar', value: 0 },
          { month: 'Apr', value: 0 },
          { month: 'May', value: 0 },
          { month: 'Jun', value: 0 },
          { month: 'Jul', value: 0 },
          { month: 'Aug', value: 0 },
          { month: 'Sep', value: 0 },
          { month: 'Oct', value: 0 },
          { month: 'Nov', value: 0 },
          { month: 'Dec', value: 0 },
        ],
        income: [
          { month: 'Jan', value: 0 },
          { month: 'Feb', value: 0 },
          { month: 'Mar', value: 0 },
          { month: 'Apr', value: 0 },
          { month: 'May', value: 0 },
          { month: 'Jun', value: 0 },
          { month: 'Jul', value: 0 },
          { month: 'Aug', value: 0 },
          { month: 'Sep', value: 0 },
          { month: 'Oct', value: 0 },
          { month: 'Nov', value: 0 },
          { month: 'Dec', value: 0 },
        ],
      }
    );
  };

  const dataByMonth = extractMonthlyData();

  return (
    <div className="mt-5 w-full flex flex-col">
      <h2 className="text-gray-700 font-bold mx-auto">{`Monthly ${filterType} by category`}</h2>
      <div className="px-10 md:w-1/3 md:px-0">
        <label
          className="block text-gray-700 font-bold mt-8"
          htmlFor="entry-type-graph-select"
        >
          Entry type
        </label>
        <Select
          onChange={onFilterTypeChange}
          value={filterType}
          options={[
            {
              value: 'expense',
              label: 'Expense',
            },
            {
              value: 'income',
              label: 'Income',
            },
          ]}
          id="entry-type-graph-select"
        />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3">
          <VictoryContainer
            height={375}
            width={375}
            style={{
              userSelect: 'auto',
              touchAction: 'auto',
            }}
          >
            <VictoryPie
              standalone={false}
              data={dataToPlot}
              labels={({ datum }: { datum: { x: string; y: number } }) =>
                `${
                  categoriesLabels[datum.x]
                    ? categoriesLabels[datum.x]
                    : datum.x
                } \n $${datum.y.toFixed(2)}`
              }
              labelComponent={<VictoryTooltip style={{ zIndex: 100 }} />}
              innerRadius={75}
              x="x"
              y="y"
              colorScale={pieChartColorScale}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={['Total', `$${totalMonthly.toFixed(2)}`]}
              style={{
                fontFamily: 'inherit',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            />
          </VictoryContainer>
        </div>
        <div className="mt-5 px-8 md:w-1/3 md:mt-10 md:px-0">
          {filterCategories.map((el, index) => {
            return (
              <button
                key={`legend-${el.name}`}
                style={{
                  backgroundColor:
                    pieChartColorScale[index % pieChartColorScale.length],
                }}
                className={`p-1 text-white rounded mt-2 flex flex-row items-center shadow-xl w-full ${
                  !el.active ? '' : 'opacity-60'
                }`}
                onClick={() => toggleCategory(el.name)}
              >
                <div
                  className={`w-4 h-4 border border-gray-700 rounded bg-white mx-1`}
                >
                  <ImCross
                    className={`w-full h-full text-gray-700 ${
                      el.active ? '' : 'hidden'
                    }`}
                  ></ImCross>
                </div>
                <span className="whitespace-nowrap overflow-hidden">
                  {categoriesLabels[el.name]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-14">
        <h2 className="text-gray-700 font-bold mx-auto text-center">
          Balance by month in {props.selectedYear}
        </h2>
        <VictoryChart
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryContainer
              style={{
                pointerEvents: 'auto',
                userSelect: 'auto',
                touchAction: 'auto',
              }}
            />
          }
        >
          <VictoryGroup colorScale={['red', 'green']} offset={10}>
            <VictoryBar
              data={dataByMonth.expense}
              x="month"
              y="value"
              barWidth={10}
              style={{
                data: {
                  stroke: '#374151',
                  strokeWidth: 1,
                },
              }}
            />
            <VictoryBar
              data={dataByMonth.income}
              x="month"
              y="value"
              barWidth={10}
              style={{
                data: {
                  stroke: '#374151',
                  strokeWidth: 1,
                },
              }}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    </div>
  );
};

export default Graphs;
