/** Styles */
import styles from './Input.module.scss';

interface InputProps {
  type: 'text' | 'number';
  name: string;
  label: string;
  value: string;
  changeHandler: (val: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  error?: boolean;
  errorMsg?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  value,
  changeHandler,
  placeholder,
  isRequired,
  error,
  errorMsg,
}) => {
  return (
    <div className={styles.formgroup}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        required={isRequired}
        value={value}
        placeholder={placeholder}
        className={error ? styles.error : ''}
        onChange={(e) => changeHandler(e.target.value)}
      />
      {error && <span className={styles.errorMsg}>{errorMsg}</span>}
    </div>
  );
};

export default Input;
