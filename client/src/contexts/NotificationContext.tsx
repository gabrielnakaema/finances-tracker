import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';

interface NotificationContextInfo {
  notification: Notification;
  changeNotification: (notification: Notification) => void;
}

interface Notification {
  type: 'ok' | 'error';
  statusCode?: number;
  message: string;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationContext = createContext({} as NotificationContextInfo);

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState({
    type: 'ok',
    message: '',
  } as Notification);

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({
          type: 'ok',
          message: '',
        });
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const changeNotification = useCallback((notification: Notification) => {
    setNotification(notification);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, changeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
