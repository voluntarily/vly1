import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { toggleLoginForm } from '../../AppActions';

const Navigation = ({ items, defaultItem, location, ...props }) => {
  const activeItem = location.pathname ? location.pathname.slice(1) : defaultItem;
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ float: 'right' }}
      selectedKeys={[activeItem]}
    >
      {items.map(item => (
        <Menu.Item key={item.key}>
          {item.key === 'login' ?
            <Link onClick={props.toggleLoginForm}>{item.text}</Link>
            :
            <Link to={item.url}>{item.text}</Link>
          }
        </Menu.Item>
      ))}
    </Menu>
  );
};

Navigation.defaultProps = {
  items: [],
  defaultItem: '',
  location: {},
  toggleLoginForm: () => {},
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  })),
  defaultItem: PropTypes.string,
  location: PropTypes.object,
  toggleLoginForm: PropTypes.func,
};

const mapDispatchToProps = {
  toggleLoginForm,
};

export default connect(null, mapDispatchToProps)(withRouter(Navigation));
