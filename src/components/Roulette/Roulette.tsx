import { Spin, WheelConfig } from '../../model/types';
import RouletteBtns from '../RouletteBtns/RouletteBtns';
import RouletteCanvas from '../RouletteCanvas/RouletteCanvas';
// import styles from './Roulette.module.scss';

interface RouletteProps {
  rouletteConfig: WheelConfig;
  onStartAndStop: () => void;
  onResetRoulette: () => void;
  onAlert: (winningSegment: string) => void;
  spin: Spin;
}

const Roulette: React.FC<RouletteProps> = ({
  rouletteConfig,
  onStartAndStop,
  onResetRoulette,
  onAlert,
  spin,
}) => {
  return (
    <>
      <RouletteCanvas
        rouletteConfig={rouletteConfig}
        onResetRoulette={onResetRoulette}
        onAlert={onAlert}
        spin={spin}
      />
      <RouletteBtns spin={spin} onStartAndStop={onStartAndStop} />
    </>
  );
};

export default Roulette;
