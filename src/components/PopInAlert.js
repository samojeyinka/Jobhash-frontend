import React, { useState, useEffect } from 'react';
import '../styles';

const PopInAlert = ({headnote, message, show, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  const closeAlert = () => {
    setVisible(false);
    onClose();
  };

  return (
    <div className={visible ? 'popin-blur' : ''}>
    <div className={`popin-alert ${visible ? 'visible' : ''}`}>
      <div className="popin-alert-content">
        <h2>{headnote}</h2>
        <span className='alert-text'>{message}</span>
        <span className='break-line'></span>
        <p onClick={closeAlert} className='alert-close-btn'>Ok</p>
      </div>
    </div>
    </div>
  );
};

export default PopInAlert;
