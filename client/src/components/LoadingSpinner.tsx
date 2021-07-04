import { AiOutlineLoading } from 'react-icons/ai';

interface LoadingSpinnerProps {
  className?: string;
}

const LoadingSpinner = (props: LoadingSpinnerProps) => {
  return (
    <AiOutlineLoading
      className={`h-12 w-12 m-5 animate-spin ${props.className}`}
    />
  );
};

export default LoadingSpinner;
