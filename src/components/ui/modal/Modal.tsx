import { SyntheticEvent } from 'react';
import ReactDOM from 'react-dom';

/** Components */
import { BsFillXCircleFill } from 'react-icons/bs';

/** Styles */
import styles from './Modal.module.scss';

interface ModalProps {
  title: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onDismiss, onConfirm }) => {
  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.backdrop} onClick={onDismiss} />
      <div className={styles.modal}>
        <BsFillXCircleFill className={styles.close} size={24} onClick={onDismiss} />
        <header className={styles.header}>{title}</header>
        <main className={styles.main}>
          <form onSubmit={submitHandler} className={styles.form}>
            <div className={styles.formContent}>{children}</div>
            <div className={styles.controlsWrapper}>
              <button className={styles.cancel} type="button" onClick={onDismiss}>
                Cancel
              </button>
              <button className={styles.confirm} type="submit">
                Confirm
              </button>
            </div>
          </form>
        </main>
      </div>
    </>,
    document.getElementById('modal')!
  );
};

export default Modal;
