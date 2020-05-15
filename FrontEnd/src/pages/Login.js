import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined, FacebookFilled, GoogleCircleFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { MyContext } from '../context/context'
import handleAsync from '../utils'
import AUTH_SERVICE from '../services/auth'

import '../index.css'
class Login extends Component {
  state = {
    msg: null,
    loading: false,
  }

  onFinish = async ( values ) => {
    this.setState({ loading: true })
    const response = await handleAsync(() => AUTH_SERVICE.LOGIN( values ));
    console.log(response)
    if (response.err) {
      this.setState({ msg: response.err.message, loading: false })
    } else {
      this.setState({ msg: response.message , loading: false })
      this.context.logUser( response.user );
      this.props.history.push( "/profile" );
    }
  }

  render() {
    return (
      <>
        {!this.state.loading && <p>{this.state.msg}</p>}
        {this.state.loading && <p>Loading...</p>}
        <Form name="login" className="login-form" initialValues={{ remember: true }} onFinish={ this.onFinish }>
          <Button   className="login-form-button FbLoginContainer">
          <a href='http://localhost:3000/auth/facebook'>
          <FacebookFilled className='FbLogin'/> Continuar con Facebook.
          </a>
          </Button>
          <Button   className="login-form-button GgLoginContainer">
          <a href='http://localhost:3000/auth/google'>
          <GoogleCircleFilled className='GgLogin'/> Continuar con Google.
          </a>
          </Button>
          <Form.Item name="email" rules={
            [{ type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your Email!' }]
            }>
            <Input prefix={ <MailOutlined className="site-form-item-icon" /> } placeholder="Email"/>
          </Form.Item>
          <Form.Item name="password" rules={
            [{ required: true, message: 'Please input your Password!' }]
            }>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Registrarse
            </Button>
            <Link to='/signup'>Crear Cuenta</Link>
          </Form.Item>
        </Form>
      </>
    );
  };
}

Login.contextType = MyContext

export default Login
