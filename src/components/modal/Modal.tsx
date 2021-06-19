import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

function Modal({ children }: any) {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element,
};

Modal.defaultProps = {
  children: null,
};

export default React.memo(Modal);
