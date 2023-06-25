import React, { useEffect, useState } from 'react';

export default function AddOptions({ onAdd, onReset, onAlert, addFormRef }) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText('');
  }, [onReset]);

  return (
    <form
      className='add-form'
      onSubmit={e => {
        e.preventDefault();

        if (text.trim().length === 0) return;
        onAdd(text);
        setText('');
      }}>
      <input
        type='text'
        value={text}
        ref={addFormRef}
        onChange={e => {
          const value = e.target.value;

          if (value.length > 12) {
            return;
          }

          setText(value);
        }}
      />
      <button>선택지 추가</button>
    </form>
  );
}
