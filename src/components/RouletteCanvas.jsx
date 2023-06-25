import React, { useEffect } from 'react';
import * as winwheel from '@evshiron/winwheel.js';

export default function RouletteCanvas({ rouletteConfig, onResetRoulette, onAlert, spin }) {
  const { canvasId } = rouletteConfig;

  useEffect(() => {
    if (Object.keys(rouletteConfig).length === 0) return;
    const roulette = new winwheel.Winwheel(rouletteConfig);
    roulette.stopAnimation(false);

    if (canvasId === 'canvas-default') {
      roulette.startAnimation();
    } else if (canvasId === 'canvas-roulette') {
      roulette.animation.callbackFinished = winningSegment => {
        onAlert(`결과: ${winningSegment.text}`, false);
        roulette.stopAnimation(false);
        onResetRoulette();
      };

      /* roulette.animation.callbackBefore = () => {
        console.log('Before');
      };

      roulette.animation.callbackAfter = () => {
        console.log('After');
      }; */

      if (spin.spinning) {
        roulette.startAnimation();
      }
    }
  }, [rouletteConfig, canvasId, spin, onResetRoulette, onAlert]);

  return (
    <div className='roulette'>
      <canvas id={canvasId} width='600' height='600'></canvas>
      <div className='roulette-circle'></div>
    </div>
  );
}
