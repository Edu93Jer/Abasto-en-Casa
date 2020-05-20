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
        [{ required: true, message: 'Por favor inserta tu nombre completo', whitespace: true, }]
      }>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nombre completo"/>
      </Form.Item>
      <Form.Item name="email" rules={
        [{ type: 'email', message: 'La entrada no es un correo electrónico válido' },
          { required: true, message: 'Inserta tu correo electrónico' }]
      }>
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Correo electrónico." />
      </Form.Item>

      <Form.Item name="password" rules={
        [{ required: true, message: 'Por favor inserte su contraseña' }]
      } hasFeedback>
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Contraseña"/>
      </Form.Item>

      <Form.Item name="verify" dependencies={['password']} hasFeedback rules={
        [{ required: true, message: 'Por favor confirme su contraseña' },
        ({ getFieldValue }) => ({ validator(rule, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
            }
            return Promise.reject('La confirmación no coincide con la contraseña!');
        },
        }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirmar Contraseña"/>
      </Form.Item>

      <Form.Item name="agreement" valuePropName="checked" rules={
        [{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Debes aceptar los términos y condiciones')}]
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
