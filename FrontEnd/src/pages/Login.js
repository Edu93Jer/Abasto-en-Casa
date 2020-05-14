import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'

import AUTH_SERVICE from '../services/auth'

import '../index.css'
class Login extends Component {

  onFinish = async ( values ) => {
    const { data } = await AUTH_SERVICE.LOGIN( values );
    this.context.logUser( data.user );
    this.props.history.push( "/profile" );
  };

  onFinishFailed = ( errorInfo ) => {
    console.log( "Failed:", errorInfo );
  };
  render() {
    return (
    <Form
      name="login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={ this.onFinish }
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input prefix={ <MailOutlined className="site-form-item-icon" /> } placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" to="/signup">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Link to='/signup'>register now!</Link>
      </Form.Item>
    </Form>
  );
};
}

export default Login
