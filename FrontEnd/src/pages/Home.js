import React, { Component } from 'react';
import handleAsync from '../utils';
import AUTH_SERVICE from '../services/auth';
import PRODUCT_SERVICE from '../services/product';
import { MyContext } from '../context/context';
import CarouselHome from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { Col, Row } from 'antd';
import ModalDetail from '../components/ProductModal';

class Home extends Component {
  state = {
    products: [],
    modalVisible: {},
  };

  async componentDidMount() {
    if (this.props.location.search === '?status=success') {
      const response = await handleAsync(AUTH_SERVICE.CURRENTUSER);
      this.context.logUser(response.user);
    }
    const { data: { products }} = await PRODUCT_SERVICE.ALL();
    const modalVisible = {};
    for (let i = 0; i < products.length; i++) {
      modalVisible[products[i]["_id"]] = false;
    }
    this.setState({ products, modalVisible });
  }

  removeProduct = async ( id ) => {
    await PRODUCT_SERVICE.DELETE(id)
    this.setModalVisible(id)
    const { products } = this.state
    const stateUpdated = products.filter((product) => product._id !== id)
    this.setState({products: stateUpdated})
  }

  setModalVisible = (id) => {
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
        <CarouselHome />
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {this.state.products.map(item => (
              <Row gutter={16} key={item._id}>
                <Col span={8}>
                  <ProductCard {...item} onClick={() => this.setModalVisible(item._id)} />
                  <ModalDetail
                    name={item.name}
                    imgURL={item.imgURL}
                    description={item.description}
                    price={item.price}
                    measurement={item.measurement}
                    _id={item._id}
                    removeProduct={() => this.removeProduct(item._id)}
                    modalVisible={modalVisible[item._id]}
                    handleOk={() => this.setModalVisible(item._id)}
                    handleCancel={() => this.setModalVisible(item._id)}
                  />
                </Col>
              </Row>
            ))}
          </Row>
        </div>
        ,
      </>
    );
  }
}

Home.contextType = MyContext;

export default Home;
