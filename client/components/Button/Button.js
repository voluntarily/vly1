import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './Button.css';

export const TYPES = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  TERTIARY: 'tertiary',
  WARNING: 'warning',
  DANGER: 'danger',
  SUCCESS: 'success',
};
export const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const BaseButton = ({ buttonType, ...props }) => (
  <button
    className={styles[buttonType]}
    {...props}
  >
    {props.children}
  </button>
);

BaseButton.propTypes = {
  buttonType: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export const Primary = props => (
  <BaseButton {...props} buttonType={TYPES.PRIMARY} />
);
export const Secondary = props => (
  <BaseButton {...props} buttonType={TYPES.SECONDARY} />
);
export const Tertiary = props => (
  <BaseButton {...props} buttonType={TYPES.TERTIARY} />
);
export const Warning = props => (
  <BaseButton {...props} buttonType={TYPES.WARNING} />
);
export const Danger = props => (
  <BaseButton {...props} buttonType={TYPES.DANGER} />
);
export const Success = props => (
  <BaseButton {...props} buttonType={TYPES.SUCCESS} />
);
