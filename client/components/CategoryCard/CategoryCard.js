/*
  Display a Category record in card format with a picture with title floating on top
*/
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CategoryCard.css';

const CategoryCard = ({ category, ...props }) => {
  return (
    <div className={styles.CategoryCard} {...props}>
      <img src={category.image} alt={category.title} />
      <p>{category.title}</p>
    </div>
	);
};

CategoryCard.propTypes = {
  category: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
  // Clicked: PropTypes.func
};

export default CategoryCard;
