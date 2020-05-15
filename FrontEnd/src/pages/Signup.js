import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AUTH_SERVICE from '../services/auth'
import { MyContext } from '../context/context'
import handleAsync from '../utils'

import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

class Signup extends Component{
  state = {
    msg: null,
    loading: false,
  }

  onFinish = async (values) => {
    this.setState({ loading: true })
    const response = await handleAsync(() => AUTH_SERVICE.SIGNUP(values));
    console.log(response)
    if (response.err) {
      this.setState({ msg: response.err.message, loading: false })
    } else {
      this.setState({ msg: response.message, loading: false })
      this.context.logUser( response.user )
      this.props.history.push("/profile")
    }
  };

  render(){
  return (
    <>
    {!this.state.loading && <p>{this.state.msg}</p>}
    {this.state.loading && <p>Loading...</p>}
    <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError>
      <Form.Item name="name" rules={
        [{ required: true, message: 'Please input your name!', whitespace: true, }]
      }>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre"/>
      </Form.Item>
      <Form.Item name="email" rules={
        [{ type: 'email', message: 'The input is not valid E-mail!' },
          { required: true, message: 'Please input your E-mail!' }]
      }>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="E-mail" />
      </Form.Item>

      <Form.Item name="password" rules={
        [{ required: true, message: 'Please input your password!' }]
      } hasFeedback>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
      </Form.Item>

      <Form.Item name="verify" dependencies={['password']} hasFeedback rules={
        [{ required: true, message: 'Please confirm your password!' },
        ({ getFieldValue }) => ({ validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
            }
            return Promise.reject('The two passwords that you entered do not match!');
        },
        }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password"/>
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" rules={
        [{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement')}]
        } {...tailFormItemLayout}>
        <Checkbox>
          <Link to="/terms"> He leido los términos y condiciones </Link>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}
}

Signup.contextType = MyContext

export default Signup;
