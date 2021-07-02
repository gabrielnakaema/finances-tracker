import { Notification } from '../types';

interface NotificationMessageProps {
  notification: Notification;
}

const NotificationMessage = (props: NotificationMessageProps) => {
  if (props.notification.message) {
    if (props.notification.type === 'error') {
      return (
        <div className="capitalize text-red-500 bg-red-100 border-red-500 border-2 rounded m-3 py-2 px-4 text-center sm:w-1/2 sm:mx-auto lg:w-1/4">
          {props.notification.message}
        </div>
      );
    } else {
      return (
        <div className="capitalize text-gray-700 bg-blue-50 border-blue-500 border-2 rounded m-3 py-2 px-4 text-center sm:w-1/2 sm:mx-auto lg:w-1/4">
          {props.notification.message}
        </div>
      );
    }
  } else {
    return <></>;
  }
};

export default NotificationMessage;
