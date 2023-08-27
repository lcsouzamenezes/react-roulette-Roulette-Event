import { BsCheck } from 'react-icons/bs';
import styles from './Alert.module.scss';
import { ReactNode } from 'react';

interface AlertProps {
  children: ReactNode;
  alertToggle: boolean;
  onAlertClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ children, alertToggle, onAlertClose }) => {
  return (
    <>
      {alertToggle && (
        <>
          <div className={styles.alert}>
            {children}
            <button className={styles.button} type='button' onClick={onAlertClose}>
              <span>
                <BsCheck />
              </span>
              <p>확인</p>
            </button>
          </div>
          <div className={styles.dim} onClick={onAlertClose}></div>
        </>
      )}
    </>
  );
};

export default Alert;
