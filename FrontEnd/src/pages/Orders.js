import React, { Component } from 'react';
import ORDER_SERVICE from '../services/order';
import { Table } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'

class Orders extends Component {
  state = {
    orders: [],
    columns: [
      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
        render: _id => <Link to={`/order/detail/${_id}`}>{_id}</Link>,
      },
      {
        title: 'No. de Productos',
        dataIndex: 'products',
        key: 'products',
        render: products => <p>{products.length} Productos en el Carrito</p>,
      },
      {
        title: 'Fecha',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: createdAt => (
          <Moment format='DD/MM/YYYY'>
            {createdAt}
          </Moment>
        ),
      },
      {
        title: 'Dirección de Envío',
        dataIndex: 'shippingAddress',
        key: 'shippingAddress',
        render: shippingAddress => <> {shippingAddress} </>,
      },
      {
        title: 'Costo Total',
        dataIndex: 'total',
        key: 'totalCost',
        render: total => <>${total.toFixed(2)}</>,
      },
      {
        title: 'Pagada?',
        dataIndex: 'paid',
        key: 'paid',
        render: paid => (
          <>
            {paid ? (
              <CheckCircleTwoTone twoToneColor="#fa8c16" style={{ fontSize: 'x-large' }} />
            ) : (
                <CloseCircleTwoTone twoToneColor="#fa8c16" style={{ fontSize: 'x-large' }} />
              )}
          </>
        ),
      },
    ],
  };

  componentDidMount = async () => {
    const response = await ORDER_SERVICE.ALL_USER();
    const { orders } = response.data
    this.setState({ orders });
  };

  render() {
    return (
      <>
        <h1>Orders</h1>
        <Table dataSource={this.state.orders} columns={this.state.columns} />
      </>
    );
  }
}

export default Orders;
