import ReactDOM from 'react-dom';

/** Styles */
import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onDismiss, onConfirm }) => {
  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <header>{title}</header>
      <main>{children}</main>
      <footer>
        <button onClick={onDismiss}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </footer>
    </div>,
    document.getElementById('modal')!
  );
};

export default Modal;
