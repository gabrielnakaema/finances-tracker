import { Entry } from '../types';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory';
import { useState } from 'react';

interface GraphsProps {
  data: Entry[];
}

interface ByTypeAndCategory {
  [key: string]: ByCategory;
}

interface ByCategory {
  [key: string]: number;
}

interface PieChartLegend {
  name: string;
}

const Graphs = (props: GraphsProps) => {
  const [filterType, setFilterType] = useState('expense');

  const totalsByTypeAndCategory: ByTypeAndCategory = {};
  props.data.forEach((entry) => {
    if (!(entry.type in totalsByTypeAndCategory)) {
      totalsByTypeAndCategory[entry.type] = {};
    }
    if (!(entry.category in totalsByTypeAndCategory[entry.type])) {
      const total = props.data.reduce(
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
  const categoryLegends: PieChartLegend[] = [];
  if (totalsByTypeAndCategory[filterType]) {
    for (const [key, value] of Object.entries(
      totalsByTypeAndCategory[filterType]
    )) {
      totalMonthly += value;
      dataToPlot.push({
        x: key,
        y: value,
      });
      categoryLegends.push({
        name: key,
      });
    }
  }
  return (
    <div>
      <div className="mt-5 w-full flex flex-col">
        <h2 className="text-gray-700 font-bold mx-auto">Graph options</h2>
        <div className="md:w-1/3">
          <label
            className="block text-gray-700 font-bold"
            htmlFor="entry-type-graph-select"
          >
            Type
          </label>
          <div className="inline-block relative w-full mt-2">
            <select
              id="entry-type-graph-select"
              className="bg-gray-200 border-2  appearance-none border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight
                focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={(e) => {
                setFilterType(e.target.value);
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <div className="pointer-events-none absolute right-0 flex items-center px-2 text-gray-700 inset-y-0">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <VictoryContainer
        height={500}
        width={500}
        style={{
          fontFamily: 'inherit',
          touchAction: 'auto',
        }}
      >
        <VictoryLabel
          x={150}
          y={40}
          text={`Monthly ${filterType} by category`}
          style={{
            fontSize: 16,
            textTransform: 'capitalize',
            color: 'gray',
            fontWeight: 'bold',
            fontFamily: 'inherit',
          }}
        />
        <VictoryLegend
          standalone={false}
          colorScale="qualitative"
          data={categoryLegends}
          title={categoryLegends.length > 0 ? 'Categories' : ''}
          centerTitle
          x={10}
          y={125}
          width={200}
          style={{
            labels: { fontFamily: 'inherit', fontSize: 16 },
            title: {
              fontFamily: 'inherit',
              fontWeight: 'bold',
              fontSize: 16,
            },
          }}
        />
        <VictoryPie
          standalone={false}
          data={dataToPlot}
          labels={({ datum }: { datum: { x: string; y: number } }) =>
            `${datum.x} \n $${datum.y.toFixed(2)}`
          }
          labelComponent={<VictoryTooltip style={{ zIndex: 100 }} />}
          width={500}
          height={500}
          innerRadius={75}
          x="x"
          y="y"
          colorScale="qualitative"
          padding={{ left: 200, right: 10 }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={345}
          y={250}
          text={['Total', `$${totalMonthly.toFixed(2)}`]}
          style={{
            fontFamily: 'inherit',
            fontSize: 16,
            fontWeight: 'bold',
          }}
        />
      </VictoryContainer>
    </div>
  );
};

export default Graphs;
