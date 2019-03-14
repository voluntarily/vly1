import React from 'react';
import PropTypes from 'prop-types';
import styles from './Divider.css';

const Divider = ({ width, ...props }) => (
  <hr className={styles.divider} width={width} {...props} />
);

Divider.propTypes = {
  width: PropTypes.string,
};

export default Divider;

