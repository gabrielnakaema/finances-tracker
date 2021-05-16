import { BiBuildingHouse, BiBus } from 'react-icons/bi';
import { FaBolt, FaMoneyBill } from 'react-icons/fa';
import { GrMoney } from 'react-icons/gr';
import { GoGraph } from 'react-icons/go';
import {
  GiHospitalCross,
  GiSlicedBread,
  GiPopcorn,
  GiSuitcase,
  GiCardRandom,
} from 'react-icons/gi';
import { Categories } from '../types';

interface CategoryIconProps {
  category: Categories;
  size: string;
}

type CategoryComponentMatch = { [key in Categories]: JSX.Element };

const CategoryIcon = (props: CategoryIconProps) => {
  const categoryComponent: CategoryComponentMatch = {
    stocks: <GoGraph size={props.size} />,
    health: <GiHospitalCross size={props.size} color={'red'} />,
    transport: <BiBus size={props.size} />,
    mainSalary: <GiSuitcase size={props.size} />,
    housing: <BiBuildingHouse size={props.size} />,
    food: <GiSlicedBread size={props.size} />,
    utilities: <FaBolt size={props.size} />,
    savings: <GrMoney size={props.size} />,
    entertainment: <GiPopcorn size={props.size} />,
    sideIncome: <FaMoneyBill size={props.size} />,
    other: <GiCardRandom size={props.size} />,
  };
  return categoryComponent[props.category];
};

export default CategoryIcon;
