interface ErrorComponentProps {
  message: string;
}

const ErrorComponent = (props: ErrorComponentProps) => {
  return (
    <div hidden={props.message ? false : true} className="text-red-500 bg-red-100 border-red-500 border rounded m-3 py-2 px-4">
      {props.message}
    </div>
  );
};

export default ErrorComponent;
