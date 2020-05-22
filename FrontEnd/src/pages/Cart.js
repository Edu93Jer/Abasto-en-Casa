import React, { Component } from 'react'
import { MyContext } from '../context/context'
import { Table, Button } from 'antd';
import { DeleteTwoTone, MinusSquareTwoTone, PlusSquareTwoTone, CreditCardTwoTone } from '@ant-design/icons'
import ORDER_SERVICE from '../services/order'

class Cart extends Component {
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
        render: (quantity, record) => {
          return (
            <div style={{ display: 'flex' }}>
              <MinusSquareTwoTone twoToneColor="#fa8c16" style={{ fontSize: 'x-large' }} onClick={() => this.changeQuantity(-.5, record)} />
              <div style={{ color: '#fa8c16', height: '23px', width: 'auto', border: '#fa8c16', borderStyle: 'solid', backgroundColor: '#FFF7E6', fontSize: '12.5px', fontWeight: 500 }}>{quantity.toFixed(1)}</div>
              <PlusSquareTwoTone twoToneColor="#fa8c16" style={{ fontSize: 'x-large' }} onClick={() => this.changeQuantity(.5, record)} />
            </div>
          )
        }
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
        render: ({ _id }) => <DeleteTwoTone twoToneColor="#fa8c16" onClick={() => this.delFromCart(_id)} />,
      },
    ],
  }

  componentDidMount() {
    const dataSource = this.context.cart
    this.setState({ order: dataSource })
  }

  changeQuantity = (quantity, product) => {
    const prevQuantity = product.quantity
    let suma = 0
    if ((prevQuantity + quantity) <= 0) {
      return suma = 1
    } else {
      suma = (prevQuantity + quantity)
    }
    const newObject = { ...product, quantity: suma }
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

  createOrder = async (totalOrder) => {
    const products = this.state.order
    const total = totalOrder
    await ORDER_SERVICE.CREATE({ products, total })
    this.setState({ order: [] })
    this.context.setCart([])
    this.props.history.push('/orders')
  }

  render() {
    return (
      <>
        <h1>Carrito de Compra</h1>
        <Table
          dataSource={this.state.order}
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
                  <Table.Summary.Cell>
                    <Button className='BuyButton' type="primary" shape="round" icon={<CreditCardTwoTone twoToneColor="#fa8c16" />} size='small' onClick={() => this.createOrder(totalOrder)} >
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
