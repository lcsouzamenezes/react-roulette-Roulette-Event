import React from 'react';
import { ImSpinner10, ImStop } from 'react-icons/im';
import { BiLoaderCircle } from 'react-icons/bi';

export default function RouletteBtns({ spin, onStartAndStop }) {
  const { spinning, stopping } = spin;
  return (
    <button
      type='button'
      onClick={onStartAndStop}
      className={`${
        spinning && stopping ? 'isStop' : spinning || stopping ? 'isSpin' : 'isDefault'
      } roulette-btn`}>
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
}
