import { ImSpinner10, ImStop } from 'react-icons/im';
import { BiLoaderCircle } from 'react-icons/bi';
import { Spin } from '../../model/types';
import styles from './RouletteBtns.module.scss';

interface RouletteBtnsProps {
  spin: Spin;
  onStartAndStop: () => void;
}

const RouletteBtns: React.FC<RouletteBtnsProps> = ({ spin, onStartAndStop }) => {
  const { spinning, stopping } = spin;

  return (
    <button
      type='button'
      onClick={onStartAndStop}
      className={`${styles.btn} ${
        spinning && stopping
          ? styles.isStop
          : spinning || stopping
          ? styles.isSpin
          : styles.isDefault
      }`}>
      {spinning && stopping ? (
        <span>
          <BiLoaderCircle />
          <p>WAIT...</p>
        </span>
      ) : spinning || stopping ? (
        <span>
          <ImStop />
          <p>STOP</p>
        </span>
      ) : (
        <span>
          <ImSpinner10 />
          <p>SPIN</p>
        </span>
      )}
    </button>
  );
};

export default RouletteBtns;
