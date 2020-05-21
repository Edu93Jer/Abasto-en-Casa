import React, { Component } from 'react'
import PRODUCT_SERVICE from '../services/product'
import ProductCard from '../components/ProductCard'
import { Col, Row, notification } from 'antd';
import ModalDetail from '../components/ProductModal';
import { MyContext } from '../context/context'
class Department extends Component {
  state = {
    products: [],
    modalVisible: {},
    department: ""
  };

  async componentDidMount() {
    const { data: { department } } = await PRODUCT_SERVICE.DEPARTMENT(this.props.location.search);
    const products = department
    const modalVisible = {};
    for (let i = 0; i < products.length; i++) {
      modalVisible[products[i]["_id"]] = false;
    }
    this.setState({ products, modalVisible });
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const { data: { department } } = await PRODUCT_SERVICE.DEPARTMENT(this.props.location.search);
      const products = department
      this.setState({ products });
    }
  }

  removeProduct = async (id) => {
    const productDeleted = await PRODUCT_SERVICE.DELETE(id)
    this.setModalVisible(id)
    const { products } = this.state
    const stateUpdated = products.filter((product) => product._id !== id)
    this.setState({ products: stateUpdated })
    this.openNotificationDelete(productDeleted)
  }

  openNotificationDelete = item => {
    notification.success({
      message: 'Producto eliminado.',
      description:
        <p>{item.data.product.name} se eliminó de la lista de productos de Abasto en Casa</p>,
      style: { background: '#fcffe6' },
      duration: 2,
    });
  };

  addToCart = (item) => {
    const newCart = [...this.context.cart, item]
    this.context.setCart(newCart)
    this.openNotificationWithIcon(item)
  }

  openNotificationWithIcon = item => {
    notification.success({
      message: 'Producto añadido.',
      description:
        <p>{item.name}  se agregó a su carrito con éxito!</p>,
      style: { background: '#fcffe6' },
      duration: 2,
    });
  };

  setModalVisible = id => {
    this.setState(prevstate => {
      return {
        ...prevstate,
        modalVisible: { ...prevstate.modalVisible, [id]: !prevstate.modalVisible[id] },
      };
    });
  };

  render() {
    const { modalVisible } = this.state;
    return (
      <>
        {/* <h1>{this.state.products[0].depart}</h1> */}
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.products.map((item) => (
              <Row gutter={16}>
                <Col span={8}>
                  <ProductCard {...item} key={item._id} onClick={() => this.setModalVisible(item._id)} />
                  <ModalDetail
                    name={item.name}
                    imgURL={item.imgURL}
                    description={item.description}
                    price={item.price}
                    measurement={item.measurement}
                    _id={item._id}
                    addToCart={() => this.addToCart(item)}
                    removeProduct={() => this.removeProduct(item._id)}
                    modalVisible={modalVisible[item._id]}
                    handleOk={() => this.setModalVisible(item._id)}
                    handleCancel={() => this.setModalVisible(item._id)}
                  />
                </Col>
              </Row>
            ))}
          </Row>
        </div>,
      </>
    )
  }
}

Department.contextType = MyContext;

export default Department