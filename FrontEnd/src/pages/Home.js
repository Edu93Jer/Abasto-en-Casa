import React, { Component } from 'react'
import handleAsync from '../utils'
import AUTH_SERVICE from '../services/auth'
import PRODUCT_SERVICE from '../services/product'
import { MyContext } from '../context/context'
import CarouselHome from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { Col, Row } from 'antd';


class Home extends Component {
 state ={
  products: []
 }
 
 async componentDidMount() {
  if (this.props.location.search === '?status=success') {
   const response = await handleAsync(AUTH_SERVICE.CURRENTUSER)
   this.context.logUser( response.user )
  }
  const { data: { products } } = await PRODUCT_SERVICE.ALL();
  console.log(products)
  this.setState({ products })
 }
 render() {
  return(
   <>
   <h1>Aqui va el HOME</h1>
   <CarouselHome/>
   <div className="site-card-wrapper">
     {this.state.products.map((item) => (
    <Row gutter={16}>
      <Col span={8}>
       <ProductCard {...item} key={item._id} />
      </Col>
    </Row>
     ))}
   </div>,
   </>
  )
 }
}

Home.contextType = MyContext

export default Home