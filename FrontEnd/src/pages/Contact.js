import React, { Component } from 'react'
import PROFILE_SERVICE from '../services/user'
import { Form, Input, Button, notification } from 'antd'
class Mailbox extends Component {
  state = {
    loading: false,
  }


  onFinish = async (values) => {
    await PROFILE_SERVICE.CREATEMESSAGE(values);
    this.props.history.push("/")
    this.openNotificationWithIcon()
  }

  openNotificationWithIcon = () => {
    notification.success({
      message: 'Mensaje enviado.',
      description:
        <p>Su mensaje ha sido enviado, nuestro personal responderá dentro de laa próximas 24hrs.
        Muchas gracias por ponerte en contácto con nosotros.
        </p>,
      style: { background: '#fcffe6' },
      duration: 3,
    });
  };

  render() {
    return (
      <>
        {/* {this.state.loading && <p>Aqui va el spiner</p>} */}
        <h1>CUÉNTANOS ALGO</h1>
        <h4>Si tienes cualquier pregunta o comentario, por favor usa el formulario a continuación.</h4>
        <br />
        <div>
          <Form labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={this.onFinish}
            name='product'>
            <Form.Item initialValues={this.initialValues} label="Nombre:" name="name" rules={[{ required: true, message: 'Por favor inserta tu nombre completo' }]}>
              <Input placeholder="Nombre completo." />
            </Form.Item>
            <Form.Item label="Correo:" name="email" rules={[{ type: 'email', message: 'La entrada no es un correo electrónico válido' }, { required: true, message: 'Inserta tu correo electrónico' }]}>
              <Input placeholder="Correo electrónico." />
            </Form.Item>
            <Form.Item label="Télefono" name="telephone">
              <Input placeholder="Télefono de contacto." />
            </Form.Item>
            <Form.Item label="Mensaje" name='body' rules={[{ required: true, message: 'Inserta el mensaje a enviar' }]}>
              <Input.TextArea placeholder="Por favor escribanos su mensaje." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enviar mensaje
        </Button>
            </Form.Item>
          </Form>
        </div>
      </>
    )
  }
}

export default Mailbox