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
}

type CategoryComponentMatch = { [key in Categories]: JSX.Element };

const CategoryIcon = (props: CategoryIconProps) => {
  const categoryComponent: CategoryComponentMatch = {
    stocks: <GoGraph size={'2rem'} />,
    health: <GiHospitalCross size={'2rem'} color={'red'} />,
    transport: <BiBus size={'2rem'} />,
    mainSalary: <GiSuitcase size={'2rem'} />,
    housing: <BiBuildingHouse size={'2rem'} />,
    food: <GiSlicedBread size={'2rem'} />,
    utilities: <FaBolt size={'2rem'} />,
    savings: <GrMoney size={'2rem'} />,
    entertainment: <GiPopcorn size={'2rem'} />,
    sideIncome: <FaMoneyBill size={'2rem'} />,
    other: <GiCardRandom size={'2rem'} />,
  };
  return categoryComponent[props.category];
};

export default CategoryIcon;
