import React, { Component } from 'react'
import PROFILE_SERVICE from '../services/user'
import { Form, Input, Button, notification } from 'antd'
import { MyContext } from '../context/context'
class Profile extends Component {

  onFinish = async (values) => {
    const response = await PROFILE_SERVICE.UPDATE(values)
    this.context.logUser(response.data.profile);
    this.openNotificationWithIcon()
    this.props.history.push("/")
  }

  openNotificationWithIcon = () => {
    notification.success({
      message: 'Perfil completado.',
      description:
        <p>Se actualizó la información de su perfil con éxito!</p>,
      style: { background: '#fcffe6' },
      duration: 2,
    });
  };

  render() {
    return (
      <MyContext.Consumer>
        {({ loggedUser }) => {
          return (
            !loggedUser ? <p>Loading...</p> : <>
              <h1>MI PERFIL</h1>
              <h4>Edita tu cuenta</h4>

              <br />
              <div>
                <Form labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="vertical"
                  onFinish={this.onFinish}
                  name='product'
                  initialValues={{ name: loggedUser.name, email: loggedUser.email, telephone: loggedUser.telephone, address: loggedUser.address }}>
                  <Form.Item label="Nombre:" name="name" rules={[{ required: true, message: 'Por favor inserta tu nombre completo' }]}>
                    <Input placeholder="Nombre completo." />
                  </Form.Item>
                  <Form.Item label="Correo:" name="email" rules={[{ type: 'email', message: 'La entrada no es un correo electrónico válido' }, { required: true, message: 'Inserta tu correo electrónico' }]}>
                    <Input placeholder="Correo electrónico." />
                  </Form.Item>
                  <Form.Item label="Télefono:" name="telephone">
                    <Input placeholder="Télefono de contacto." />
                  </Form.Item>
                  <Form.Item label="Domicilio" name='address' rules={[{ required: true, message: 'Inserta la dirección de envío' }]}>
                    <Input placeholder="Por favor ingrese la dirección de entrega." />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Actualizar Perfil
        </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

Profile.contextType = MyContext

export default Profile


