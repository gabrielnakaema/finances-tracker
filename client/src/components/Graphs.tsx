import { Entry, EntryTypes } from '../types';
import isSameMonth from 'date-fns/isSameMonth';
import parseISO from 'date-fns/parseISO';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
  VictoryTooltip,
} from 'victory';
import { useState } from 'react';
import addMonths from 'date-fns/addMonths';
import Button from './Button';
import format from 'date-fns/format';

interface GraphsProps {
  data: Entry[];
}

interface ByTypeAndCategory {
  [key: string]: ByCategory;
}

interface ByCategory {
  [key: string]: number;
}

const Graphs = (props: GraphsProps) => {
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<EntryTypes>('expense');

  const dataInFilterMonth = props.data.filter((entry) =>
    isSameMonth(filterDate, parseISO(entry.date))
  );

  const handleDecreaseMonth = () => {
    setFilterDate(addMonths(filterDate, -1));
  };

  const handleIncreaseMonth = () => {
    setFilterDate(addMonths(filterDate, 1));
  };

  let totalsByTypeAndCategory: ByTypeAndCategory = {};
  dataInFilterMonth.forEach((entry) => {
    if (!(entry.type in totalsByTypeAndCategory)) {
      totalsByTypeAndCategory[entry.type] = {};
    }
    if (!(entry.category in totalsByTypeAndCategory[entry.type])) {
      const total = dataInFilterMonth.reduce(
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
      totalMonthly += value;
      dataToPlot.push({
        x: key,
        y: value,
      });
    }
  }
  return (
    <div className="sm:w-1/2 lg:w-1/3">
      <div className="m-3 p-3 border border-gray-100">
        <div className="flex flex-row items-center">
          <Button onClick={handleDecreaseMonth} className="px-5 py-2">
            {'<'}
          </Button>
          <span className="font-semibold px-1 text-gray-700 whitespace-nowrap">
            {format(filterDate, 'MMMM, yyyy')}
          </span>
          <Button onClick={handleIncreaseMonth} className="px-5 py-2">
            {'>'}
          </Button>
        </div>
        <div>
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
        <div>
          <VictoryContainer height={450} width={450}>
            <VictoryPie
              standalone={false}
              data={dataToPlot}
              labels={({ datum }: { datum: { x: string; y: number } }) =>
                `${datum.x} \n $${datum.y.toFixed(2)}`
              }
              labelComponent={<VictoryTooltip style={{ zIndex: 100 }} />}
              width={450}
              height={450}
              innerRadius={80}
              labelRadius={100}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: (e, props) => {
                      return [
                        {
                          target: 'labels',
                          mutation: () => {
                            return { active: true };
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
              x="x"
              y="y"
              colorScale="qualitative"
            />
            <VictoryLabel
              className="font-sans font-medium text-gray-700"
              textAnchor="middle"
              verticalAnchor="middle"
              x={225}
              y={225}
              text={['Total', `$${totalMonthly}`]}
            />
          </VictoryContainer>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
