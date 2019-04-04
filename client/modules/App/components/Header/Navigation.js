import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { Menu } from 'antd';

const Navigation = ({ items, defaultItem, location }) => {
  const activeItem = location.pathname ? location.pathname.slice(1) : defaultItem;
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ float: 'right', lineHeight: '64px' }}
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
  location: {},
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  })),
  defaultItem: PropTypes.string,
  location: PropTypes.object,
};

export default withRouter(Navigation);
