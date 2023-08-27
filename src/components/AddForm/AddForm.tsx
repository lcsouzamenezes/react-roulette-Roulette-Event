import { useEffect, useState } from 'react';
import styles from './AddForm.module.scss';

interface AddFormProps {
  onAdd: (text: string) => void;
  onReset: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAdd, onReset }) => {
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setInputText('');
  }, [onReset]);

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        if (inputText.trim().length === 0) return;
        onAdd(inputText);
        setInputText('');
      }}>
      <input
        type='text'
        value={inputText}
        onChange={e => {
          const value = e.target.value;

          if (value.length > 12) {
            return;
          }

          setInputText(value);
        }}
      />
      <button>선택지 추가</button>
    </form>
  );
};

export default AddForm;
