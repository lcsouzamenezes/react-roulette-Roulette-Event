import React from 'react';
import { BsCheck } from 'react-icons/bs';

export default function Alert({ children, alertToggle, onAlertClose }) {
  return (
    <>
      {alertToggle && (
        <>
          <div className='alert'>
            {children}
            <button className='alert__btn' type='button' onClick={onAlertClose}>
              <span>
                <BsCheck />
              </span>
              <p>확인</p>
            </button>
          </div>
          <div className='dim' onClick={onAlertClose}></div>
        </>
      )}
    </>
  );
}
