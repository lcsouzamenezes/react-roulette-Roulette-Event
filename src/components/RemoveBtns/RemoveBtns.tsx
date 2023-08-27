import styles from './RemoveBtns.module.scss';
import { BsTrash3Fill } from 'react-icons/bs';
import { RxReset } from 'react-icons/rx';

interface RemoveBtnProps {
  onReset: () => void;
  onDelete: () => void;
}

const RemoveBtns: React.FC<RemoveBtnProps> = ({ onReset, onDelete }) => {
  return (
    <nav className={styles.nav}>
      <button type='button' className={styles.button} onClick={onDelete}>
        <span>
          <BsTrash3Fill />
        </span>
        <p>삭제</p>
      </button>

      <button type='button' className={styles.button} onClick={onReset}>
        <span style={{ fontSize: '1.2rem' }}>
          <RxReset />
        </span>
        <p>초기화</p>
      </button>
    </nav>
  );
};

export default RemoveBtns;
