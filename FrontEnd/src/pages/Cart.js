import React, { Component } from 'react'
import { MyContext } from '../context/context'
import { Table } from 'antd';

const columns = [
 {
  title: 'Imagen',
  dataIndex: 'imgURL',
  key: 'imgURL',
  render: imgURL => <img src={imgURL} alt='orderImg' style={{ width:60 }}/>
 },
 {
   title: 'Nombre',
   dataIndex: 'name',
   key: 'name',
 },
 {
   title: 'Descripción',
   dataIndex: 'description',
   key: 'description',
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
  title: 'Precio',
  dataIndex: 'price',
  key: 'price',
  render: price => <>${price.toFixed(2)}</>,
 },
];

class Cart extends Component {
 state={
  order: []
 }

 componentDidMount(){
  const dataSource = this.context.cart
  console.log(dataSource)
  this.setState({ order: dataSource })
 }

 render() {
  return(
  <>
  <h1>Cart</h1>
  <Table
   dataSource={ this.state.order }
   columns={ columns }
   pagination={false}
   summary={pageData => {
    let totalOrder = 0;
    pageData.forEach(({ price }) => {
     totalOrder += price;
    });
    return (
     <>
      <Table.Summary.Row>
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

Cart.contextType = MyContext

export default Cart