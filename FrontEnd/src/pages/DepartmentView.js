import React, {Component} from 'react'
import PRODUCT_SERVICE from '../services/product'
import ProductCard from '../components/ProductCard'
import CarouselHome from '../components/Carousel'
import { Col, Row } from 'antd';
import ModalDetail from '../components/ProductModal';
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
  await PRODUCT_SERVICE.DELETE(id)
  this.setModalVisible(id)
}

  setModalVisible = id => {
    this.setState(prevstate => {
      return {
        ...prevstate,
        modalVisible: { ...prevstate.modalVisible, [id]: !prevstate.modalVisible[id] },
      };
    });
  };

 render(){
  const { modalVisible } = this.state;
  return(
   <>
   {/* <h1>Departamento de:</h1> */}
   {/* <h1>{this.state.department}</h1> */}
   <CarouselHome/>
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

export default Department