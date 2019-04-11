import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import {
  Modal,
  Form,
  Input,
} from 'antd';
import { toggleLoginForm } from '../../AppActions';
import './Login.css';

// TODO
// - internationalisation
// - api call for authentication
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
    };

    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
  }

  close() {
    this.props.toggleLoginForm();
  }

  submit(e) {
    e.preventDefault();
    this.setState({
      submitting: true,
    });
    this.props.form.validateFields((err, vals) => {
      // eslint-disable-next-line no-console
      console.log('vals', vals);
      if (!err) {
        // eslint-disable-next-line no-console
        console.log('success', vals);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Log in"
        className="login-form"
        visible={this.props.showLoginForm}
        maskClosable={false}
        onCancel={this.close}
        onOk={this.submit}
        confirmLoading={this.state.submitting}
        closable
        mask
      >
        <Form
          onSubmit={this.submit}
          hideRequiredMark
          colon={false}
        >
          <Form.Item label="Username">
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Please input a user name' },
                { type: 'email', message: 'Please enter a valid email address' },
              ],
            })(<Input type="email" placeholder="Enter email address" />)}
          </Form.Item>

          <Form.Item label="Password">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input a password' },
                { min: 12, message: 'Please enter at least 12 characters' },
              ],
            })(
              <Input.Password placeholder="Enter password" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

Login.propTypes = {
  intl: PropTypes.object,
  form: PropTypes.object,
  toggleLoginForm: PropTypes.func,
  showLoginForm: PropTypes.bool,
};

const mapStateToProps = state => ({
  showLoginForm: state.app.showLoginForm,
});

const mapDispatchToProps = {
  toggleLoginForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Login));
