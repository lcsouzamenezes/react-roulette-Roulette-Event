import { useLayoutEffect } from 'react';
import * as winwheel from '@evshiron/winwheel.js';
import styles from './RouletteCanvas.module.scss';
import { Spin, WheelConfig, WinnigSegment } from '../../model/types';

interface RouletteCanvasProps {
  rouletteConfig: WheelConfig;
  onResetRoulette?: () => void;
  onAlert?: (winningSegment: string) => void;
  spin?: Spin;
}

const RouletteCanvas: React.FC<RouletteCanvasProps> = ({
  rouletteConfig,
  onResetRoulette,
  onAlert,
  spin,
}) => {
  const { canvasId } = rouletteConfig;

  useLayoutEffect(() => {
    if (Object.keys(rouletteConfig).length === 0) return;

    const roulette = new winwheel.Winwheel(rouletteConfig);
    roulette.stopAnimation(false);

    if (canvasId === 'canvas-default') {
      roulette.startAnimation();
    } else {
      roulette.animation.callbackFinished = (winningSegment: WinnigSegment) => {
        onAlert?.(`결과: ${winningSegment.text}`);
        roulette.stopAnimation(false);
        onResetRoulette?.();
      };

      /* roulette.animation.callbackBefore = () => {
        console.log('Before');
      };

      roulette.animation.callbackAfter = () => {
        console.log('After');
      }; */

      if (spin?.spinning) {
        roulette.startAnimation();
      }
    }
  }, [rouletteConfig, canvasId, spin, onResetRoulette, onAlert]);

  return (
    <div className={styles.roulette}>
      <canvas id={canvasId} width='600' height='600'></canvas>
      <div className={styles.circle}></div>
    </div>
  );
};

export default RouletteCanvas;
