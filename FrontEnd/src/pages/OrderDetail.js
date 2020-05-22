import React, { Component } from 'react'
import { MyContext } from '../context/context'
import { Table, Descriptions } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import ORDER_SERVICE from '../services/order'
import Moment from 'react-moment'

class OrderDetail extends Component {
 state = {
  order: [],
  columns: [
   {
    title: 'Imagen',
    dataIndex: 'imgURL',
    key: 'imgURL',
    render: imgURL => <img src={imgURL} alt='orderImg' style={{ width: 60 }} />
   },
   {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
   },
   {
    title: 'Cantidad',
    dataIndex: 'quantity',
    key: 'quantity',
   },
   {
    title: 'Medida',
    dataIndex: 'measurement',
    key: 'measurement',
   },
   {
    title: 'Precio Unitario',
    dataIndex: 'price',
    key: 'price',
    render: price => <>${price.toFixed(2)}</>,
   },
   {
    title: 'Costo Total',
    key: 'totalCost',
    render: ({ price, quantity }) => <>${(price * quantity).toFixed(2)}</>,
   },
  ],
 }

 async componentDidMount() {
  const { id } = this.props.match.params
  const { data } = await ORDER_SERVICE.DETAIL(id)
  console.log(data)
  const { order } = data
  this.setState({ order: order })
 }

 changeQuantity = (quantity, product) => {
  const prevQuantity = product.quantity
  const newObject = { ...product, quantity: prevQuantity + quantity }
  const { order } = this.state
  const orderUpdated = order.map((ele) => {
   if (ele._id === product._id) {
    return newObject
   } else {
    return ele
   }
  })
  this.setState({ order: orderUpdated })
 }

 delFromCart = (id) => {
  const products = this.state.order
  const productsUpdated = products.filter((ele) => ele._id !== id)
  this.setState({ order: productsUpdated })
  this.context.setCart(productsUpdated)
 }


 render() {
  return (
   <>

    <Descriptions title={<>Pedido No. {this.state.order._id}</>}>
     <Descriptions.Item label="Usuario"><>{this.state.order.user?.name}</></Descriptions.Item>
     <Descriptions.Item label="Fecha">
      <Moment format='DD/MM/YYYY'>
       {this.state.order.createdAt}
      </Moment>
     </Descriptions.Item>
     <Descriptions.Item label="Precio Total"><p> ${this.state.order.total?.toFixed(2)} MXN </p></Descriptions.Item>
     <Descriptions.Item label="Pagada">
      <>
       {this.state.order.paid ? (
        <CheckCircleTwoTone twoToneColor="#7cb305" style={{ fontSize: 'x-large' }} />
       ) : (
         < CloseCircleTwoTone twoToneColor="#fa8c16" style={{ fontSize: 'x-large' }} />
        )}
      </>
     </Descriptions.Item>
     <Descriptions.Item label="Dirección de Entrega">
      <>{this.state.order.shippingAddress}</>
     </Descriptions.Item>
    </Descriptions>
    <Table
     dataSource={this.state.order.products}
     columns={this.state.columns}
     pagination={false}
     summary={pageData => {
      let totalOrder = 0;
      pageData.forEach((ele) => {
       const totalCost = (ele.price * ele.quantity)
       totalOrder += totalCost;
      });
      return (
       <>
        <Table.Summary.Row>
         <Table.Summary.Cell />
         <Table.Summary.Cell />
         <Table.Summary.Cell />
         <Table.Summary.Cell />
         <Table.Summary.Cell>Total</Table.Summary.Cell>
         <Table.Summary.Cell>
          <p>${totalOrder.toFixed(2)} MXN</p>
         </Table.Summary.Cell>
        </Table.Summary.Row>
       </>
      )
     }}
    />
   </>
  )
 }
}

OrderDetail.contextType = MyContext

export default OrderDetail
