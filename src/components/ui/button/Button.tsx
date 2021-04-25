/** Styles  */
import styles from './Button.module.scss';

interface ButtonProps {
  view: 'warning' | 'success';
  text: string;
  type: 'button' | 'submit';
  actionHandler?: () => void;
}

const Button: React.FC<ButtonProps> = ({ view, text, type, actionHandler }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${view === 'warning' ? styles.warning : styles.success}`}
      onClick={actionHandler}
    >
      {text}
    </button>
  );
};

export default Button;
