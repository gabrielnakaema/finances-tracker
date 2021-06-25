interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  return (
    <div
      hidden={props.message ? false : true}
      className="capitalize text-red-500 bg-red-100 border-red-500 border rounded m-3 py-2 px-4"
    >
      {props.message}
    </div>
  );
};

export default ErrorMessage;
