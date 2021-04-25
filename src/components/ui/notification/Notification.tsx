import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

/** Styles */
import styles from './Notification.module.scss';

interface NotificationProps {
  type: 'warning' | 'success';
  text: string | null;
}

const Notification: React.FC<NotificationProps> = ({ type, text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${styles.notification} ${type === 'warning' ? styles.warning : styles.success}`}
    >
      {text}
    </div>,
    document.getElementById('notification')!
  );
};

export default Notification;
