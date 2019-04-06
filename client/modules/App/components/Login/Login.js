import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import {
  Modal,
  Form,
  Input,
} from 'antd';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      submitting: false,
      passwordVisible: false,
    };

    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  submit(e) {
    e.preventDefault();
    this.setState({
      submitting: true,
    });
    this.props.form.validateFields((err, vals) => {
      console.log('vals', vals);
      if (!err) {
        console.log('success', vals);
      }
    });
  }

  togglePasswordVisibility() {
    this.setState({
      passwordVisible: !this.state.passwordVisible,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Log in"
        className="login-form"
        visible={this.state.visible}
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
  visible: PropTypes.bool,
  intl: PropTypes.object,
  form: PropTypes.object,
};

export default Form.create()(Login);
