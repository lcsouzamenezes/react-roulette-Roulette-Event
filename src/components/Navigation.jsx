import React from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import { RxReset } from 'react-icons/rx';

export default function Navigation({ onDelete, onReset }) {
  return (
    <nav className='nav-btns'>
      <button type='button' className='nav-btns__btn' onClick={onDelete}>
        <span>
          <BsTrash3Fill />
        </span>
        <p>삭제</p>
      </button>

      <button type='button' className='nav-btns__btn' onClick={onReset}>
        <span style={{ fontSize: '1.2rem' }}>
          <RxReset />
        </span>
        <p>초기화</p>
      </button>
    </nav>
  );
}
