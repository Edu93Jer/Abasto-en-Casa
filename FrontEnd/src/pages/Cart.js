import React, { Component } from 'react'
import { MyContext } from '../context/context'
import { Table,  Button } from 'antd';
import { DeleteTwoTone, MinusSquareTwoTone, PlusSquareTwoTone, CreditCardTwoTone } from '@ant-design/icons'
import ORDER_SERVICE from '../services/order'

class Cart extends Component {
  state={
    order: [],
    columns: [
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
         title: 'Cantidad',
         dataIndex: 'quantity',
         key: 'quantity',
       },
       {
        title: '',
        key: 'quantity',
        render: ({ quantity })=>
          <>
            <PlusSquareTwoTone twoToneColor="#fa8c16" style={{fontSize: 'x-large'}} onClick={() => this.plus(quantity)} />
            <MinusSquareTwoTone twoToneColor="#fa8c16" style={{fontSize: 'x-large'}} onClick={() => this.minus(quantity)}/>
          </>
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
       {
        title: 'Delete',
        key: 'delete',
        render: ({ _id }) => <DeleteTwoTone twoToneColor="#fa8c16" onClick={() => this.delFromCart(_id)}/>,
       },
      ],
 }

 componentDidMount(){
  const dataSource = this.context.cart
  this.setState({ order: dataSource })
 }

//  onChange = (value, quantity) => {
//     console.log('changed ', value)
//  }

 plus = (quantity) => {
   console.log('Suma+1')
 }

 minus = (quantity) => {
   console.log('Resta -1')
 }

 delFromCart = ( id ) => {
    const products = this.state.order
    const productsUpdated = products.filter((ele) => ele._id !== id)
    this.setState({ order: productsUpdated })
    this.context.setCart(productsUpdated)
 }

 createOrder= async ( totalOrder ) => {
   const products = this.state.order
   const total = totalOrder
   await ORDER_SERVICE.CREATE({products, total})
   this.setState({ order: [] })
   this.context.setCart([])
   this.props.history.push('/orders')
 }

 render() {
  return(
  <>
  <h1>Carrito de Compra</h1>
  <Table
   dataSource={ this.state.order }
   columns={ this.state.columns }
   pagination={false}
   summary={pageData => {
    let totalOrder = 0;
    pageData.forEach(({ price }) => {
     totalOrder += price;
    });
    return (
     <>
      <Table.Summary.Row>
        <Table.Summary.Cell/>
        <Table.Summary.Cell/>
        <Table.Summary.Cell/>
        <Table.Summary.Cell/>
        <Table.Summary.Cell/>
        <Table.Summary.Cell>Total</Table.Summary.Cell>
        <Table.Summary.Cell>
          <p>${totalOrder.toFixed(2)} MXN</p>
        </Table.Summary.Cell>
        <Table.Summary.Cell>
        <Button className='BuyButton' type="primary" shape="round" icon={<CreditCardTwoTone twoToneColor="#fa8c16"/>} size='small' onClick={() => this.createOrder(totalOrder)} >
          Comprar
        </Button>
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
