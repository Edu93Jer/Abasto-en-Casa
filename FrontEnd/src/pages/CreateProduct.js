import React, { Component } from 'react'
import { Form, Input, Select, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import PRODUCT_SERVICE from '../services/product'


class CreateProduct extends Component {
  state ={
    imageURL:"",
  }

 onFinish = async ( values ) => {
  const { imageURL } = this.state
  values.imgURL = imageURL
  await PRODUCT_SERVICE.CREATE( values );
  this.props.history.push("/")
  }

onChange = (info) => {
  if (info.file.status !== 'uploading') {
     const { secure_url } = info.file.response
     const imageURL = secure_url
     this.setState({ imageURL })
  }
}
 render() {

  const props = {
    name: 'imageURL',
    action: 'http://localhost:3000/upload',
    listType: 'picture',
    accept: ".jpg, .jpeg, .png",
  }

  return(
  <>
  <h1>Crear Producto</h1>

  <div>
      <Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
         onFinish={this.onFinish}
         name= 'product'>
        <Form.Item name="imgURL">
         <Upload {...props} onChange={this.onChange}>
          <Button>
           <UploadOutlined /> Subir Imagen del Producto
          </Button>
         </Upload>
        </Form.Item>
        <Form.Item label="Nombre:" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Departamento:" name="department">
          <Select>
            <Select.Option value="market">Abarrotes</Select.Option>
            <Select.Option value="meats">Carnes y Salchichoneria</Select.Option>
            <Select.Option value="fruits">Frutas</Select.Option>
            <Select.Option value="vegetables">Verduras</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Precio:" style={{ marginBottom: 0 }}>
        <Form.Item  name="price" style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}>
        <Input prefix="$" suffix="MXN" type="number" step="0.01" min="0"/>
        </Form.Item>
        <Form.Item name="measurement" style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }}>
          <Select placeholder="Medida">
            <Select.Option value="Kilo">Kg.</Select.Option>
            <Select.Option value="Gramos">gr.</Select.Option>
            <Select.Option value="Litro">Lts.</Select.Option>
            <Select.Option value="Mililitros">ml.</Select.Option>
            <Select.Option value="Pieza">Pieza</Select.Option>
          </Select>
        </Form.Item>
        </Form.Item>
        <Form.Item name='description' label="Descripción">
        <Input.TextArea  maxLength="100"/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Agregar Producto
        </Button>
      </Form.Item>
      </Form>
    </div>


  </>
  )
 }
}

export default CreateProduct