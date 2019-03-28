import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Menu } from 'antd';

const Navigation = ({ items, defaultItem }) => {
  const activeItem = window.location.pathname.slice(1) || defaultItem;
  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{ float: 'right' }}
      selectedKeys={[activeItem]}
    >
      {items.map(item => (
        <Menu.Item key={item.key}>
          <Link to={item.url}>{item.text}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
};

Navigation.defaultProps = {
  items: [],
  defaultItem: '',
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  })),
  defaultItem: PropTypes.string,
};

export default Navigation;
