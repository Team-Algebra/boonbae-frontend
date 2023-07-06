import React from 'react';
import '../../../styles/Modal.css';

const Modal = ({isOpen,children,closeModal}) => {
  return (
    <div className={isOpen ? 'modal-open' : 'modal-close'}>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <button onClick={closeModal}>X</button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;