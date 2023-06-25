import React from 'react';
import RouletteCanvas from './RouletteCanvas';
import RouletteBtns from './RouletteBtns';

export default function Roulette({
  rouletteConfig,
  onStartAndStop,
  onResetRoulette,
  onAlert,
  spin,
}) {
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
}
