import React, { Component } from 'react'
import { Form, Input, Select, Upload, Button, notification } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import PRODUCT_SERVICE from '../services/product'


class UpdateProduct extends Component {
  state = {
    imageURL: "",
    product: ""
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const response = await PRODUCT_SERVICE.DETAIL(id);
    const { product } = response.data
    this.setState({ product });
  }

  onFinish = async (values) => {
    const { id } = this.props.match.params
    const { imageURL } = this.state
    values.imgURL = imageURL
    const newProduct = await PRODUCT_SERVICE.UPDATE(id, values);
    this.openNotificationWithIcon(newProduct)
    this.props.history.push("/")
  }

  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      const { secure_url } = info.file.response
      const imageURL = secure_url
      this.setState({ imageURL })
    }
  }

  openNotificationWithIcon = (item) => {
    notification.success({
      message: 'Producto Actualizado.',
      description:
        <p>El producto {item.data.product.name} se ha actualizado con éxito!</p>,
      style: { background: '#fcffe6' },
      duration: 2,
    });
  };

  render() {

    const props = {
      name: 'imageURL',
      action: 'https://pacific-stream-12212.herokuapp.com/upload',
      listType: 'picture',
      accept: ".jpg, .jpeg, .png",
    }

    const { product } = this.state

    return (
      !product ? <p>Loading...</p> : <>
        <h1>Actualizar Producto</h1>
        <br />
        <br />
        <h5>Imagen Actual:</h5>
        <img src={product.imgURL} className='ImgUpdate' alt={product.name} />
        <br />
        <br />
        <div>
          <Form labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={this.onFinish}
            name='product'>
            <Form.Item name="imgURL">
              <Upload {...props} onChange={this.onChange}>
                <Button>
                  <UploadOutlined /> Subir Imagen del Producto
          </Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Nombre:" name="name">
              <Input defaultValue={product.name} />
            </Form.Item>
            <Form.Item label="Departamento:" name="department">
              <Select defaultValue={product.department}>
                <Select.Option value="market" >Abarrotes</Select.Option>
                <Select.Option value="meats">Carnes y Salchichoneria</Select.Option>
                <Select.Option value="fruits">Frutas</Select.Option>
                <Select.Option value="vegetables">Verduras</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Precio:" style={{ marginBottom: 0 }}>
              <Form.Item name="price" style={{ display: 'inline-block', width: 'calc(70% - 8px)' }}>
                <Input defaultValue={product.price} prefix="$" suffix="MXN" type="number" step="0.01" min="0" />
              </Form.Item>
              <Form.Item name="measurement" style={{ display: 'inline-block', width: 'calc(30% - 8px)', margin: '0 8px' }}>
                <Select placeholder="Medida" defaultValue={product.measurement}>
                  <Select.Option value="Kilo">Kg.</Select.Option>
                  <Select.Option value="Gramos">gr.</Select.Option>
                  <Select.Option value="Litro">Lts.</Select.Option>
                  <Select.Option value="Mililitros">ml.</Select.Option>
                  <Select.Option value="Pieza">Pieza</Select.Option>
                </Select>
              </Form.Item>
            </Form.Item>
            <Form.Item name='description' label="Descripción">
              <Input.TextArea defaultValue={product.description} maxLength="100" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Actualizar Producto
        </Button>
            </Form.Item>
          </Form>
        </div>


      </>
    )
  }
}

export default UpdateProduct