import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu } from 'antd';

const Navigation = ({ items }) => (
  <Menu
    theme="light"
    mode="horizontal"
    style={{ float: 'right' }}
  >
    {items.map(item => (
      <Menu.Item key={item.key}>
        <Link to={item.url}>{item.text}</Link>
      </Menu.Item>
    ))}
  </Menu>
);

Navigation.defaultProps = {
  items: [],
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  })),
};

export default Navigation;
