import React, { Component } from 'react'
import PROFILE_SERVICE from '../services/user'
import { Form, Input, Button } from 'antd'
class Mailbox extends Component {
  state = {
    msg: null,
    loading: false,
  }


 onFinish = async ( values ) => {
  await PROFILE_SERVICE.CREATEMESSAGE( values );
  this.props.history.push("/contact")
  this.setState({ msg: 'Mensaje enviado, dentro de 24 horas contestaremos su mesaje.' })
  }

  // async componentDidUpdate(prevProps) {
  //   if (this.props !== prevProps) {
  //   this.props.history.push("/contact")
  //   }
  // }

 render() {
  return(
   <>
   {this.state.msg && <p>{this.state.msg}</p>}
   <h1>CUÉNTANOS ALGO</h1>
   <h4>Si tienes cualquier pregunta o comentario, por favor usa el formulario a continuación.</h4>
   <br/>
   <div>
      <Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
         onFinish={this.onFinish}
         name= 'product'>
        <Form.Item initialValues={this.initialValues} label="Nombre:" name="name" rules={[{ required: true, message: 'Por favor inserta tu nombre completo' }]}>
          <Input placeholder="Nombre completo."/>
        </Form.Item>
        <Form.Item label="Correo:" name="mail" rules={[{ type: 'email', message: 'La entrada no es un correo electrónico válido' }, { required: true, message: 'Inserta tu correo electrónico' }]}>
          <Input placeholder="Correo electrónico."/>
        </Form.Item>
        <Form.Item label="Télefono" name="telephone">
          <Input placeholder="Télefono de contacto."/>
        </Form.Item>
        <Form.Item  label="Mensaje" name='body' rules={[{ required: true, message: 'Inserta el mensaje a enviar' }]}>
        <Input.TextArea placeholder="Por favor escribanos su mensaje."/>
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