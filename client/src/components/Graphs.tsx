import { Entry } from '../types';
import {
  VictoryContainer,
  VictoryLabel,
  VictoryLegend,
  VictoryPie,
  VictoryTooltip,
} from 'victory';

interface GraphsProps {
  data: Entry[];
  filterType: string;
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
  if (totalsByTypeAndCategory[props.filterType]) {
    for (const [key, value] of Object.entries(
      totalsByTypeAndCategory[props.filterType]
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
        text={`Monthly ${props.filterType} by category`}
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
  );
};

export default Graphs;
