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
      <div className="mt-2 w-full flex flex-col items-center">
        <h2 className="text-gray-700 font-bold">Graph Filters</h2>
        <div className="mx-auto">
          <input
            id="graph-filter-expense-radio"
            type="radio"
            value="expense"
            name="graph-filter-expense-type"
            checked={filterType === 'expense'}
            onChange={() => setFilterType('expense')}
          />{' '}
          <label
            className=" text-gray-700"
            htmlFor="graph-filter-expense-radio"
          >
            Expense
          </label>
          <input
            id="graph-filter-income-radio"
            type="radio"
            value="income"
            name="graph-filter-expense-type"
            className="ml-3"
            checked={filterType === 'income'}
            onChange={() => setFilterType('income')}
          />{' '}
          <label className=" text-gray-700" htmlFor="graph-filter-income-radio">
            Income
          </label>
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
          y={30}
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
