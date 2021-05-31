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
    stocks: <GoGraph size={props.size} color="rgba(55, 65, 81,1)" />,
    health: <GiHospitalCross size={props.size} color="rgba(55, 65, 81,1)" />,
    transport: <BiBus size={props.size} color="rgba(55, 65, 81,1)" />,
    mainSalary: <GiSuitcase size={props.size} color="rgba(55, 65, 81,1)" />,
    housing: <BiBuildingHouse size={props.size} color="rgba(55, 65, 81,1)" />,
    food: <GiSlicedBread size={props.size} color="rgba(55, 65, 81,1)" />,
    utilities: <FaBolt size={props.size} color="rgba(55, 65, 81,1)" />,
    savings: <GrMoney size={props.size} color="rgba(55, 65, 81,1)" />,
    entertainment: <GiPopcorn size={props.size} color="rgba(55, 65, 81,1)" />,
    sideIncome: <FaMoneyBill size={props.size} color="rgba(55, 65, 81,1)" />,
    other: <GiCardRandom size={props.size} color="rgba(55, 65, 81,1)" />,
  };
  return categoryComponent[props.category];
};

export default CategoryIcon;
