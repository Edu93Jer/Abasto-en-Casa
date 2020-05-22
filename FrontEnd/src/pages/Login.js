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

  onFinish = async (values) => {
    this.setState({ loading: true })
    const response = await handleAsync(() => AUTH_SERVICE.LOGIN(values));
    if (response.err) {
      this.setState({ msg: response.err.message, loading: false })
    } else {
      this.setState({ msg: response.message, loading: false })
      this.context.logUser(response.user);
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!this.state.loading && <p>{this.state.msg}</p>}
        {this.state.loading && <p>Loading...</p>}
        <Form name="login" className="login-form" initialValues={{ remember: true }} onFinish={this.onFinish}>
          <Button className="login-form-button FbLoginContainer">
            <a href='https://pacific-stream-12212.herokuapp.com/auth/facebook'>
              <FacebookFilled className='FbLogin' /> Continuar con Facebook.
          </a>
          </Button>
          <Button className="login-form-button GgLoginContainer">
            <a href='https://pacific-stream-12212.herokuapp.com/auth/google'>
              <GoogleCircleFilled className='GgLogin' /> Continuar con Google.
          </a>
          </Button>
          <br />
          <br />
          <Form.Item name="email" rules={
            [{ type: 'email', message: 'La entrada no es un correo electrónico válido' },
            { required: true, message: 'Inserta tu correo electrónico' }]
          }>
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Correo Electrónico" />
          </Form.Item>
          <Form.Item name="password" rules={
            [{ required: true, message: 'Por favor confirme su contraseña' }]
          }>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recuérdame</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Registrarse
            </Button>
            <Link to='/signup'>Crear Cuenta</Link>
          </Form.Item>
        </Form>
      </div>
    );
  };
}

Login.contextType = MyContext

export default Login
