interface ButtonProps {
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-300 py-2 px-4 text-white rounded w-1/2 block mx-auto font-medium ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
