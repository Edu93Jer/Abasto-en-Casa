import React from 'react'
import { MyContext} from '../context/context'
import { Card } from 'antd';
import { EditTwoTone, ShoppingCartOutlined , DeleteTwoTone } from '@ant-design/icons';
import { Link } from 'react-router-dom'

const { Meta } = Card;

function CardDetail({ imgURL, name, price, measurement, description, _id, removeProduct}){
  const action = (loggedUser) => {
    if ( loggedUser?.rol === 'admin' ) {
      return [
        <Link to={`/product/edit/${_id}`}><EditTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16"/></Link>,
        <ShoppingCartOutlined style={{fontSize: 'large'}} twoToneColor="#fa8c16"/>,
        <DeleteTwoTone onClick={removeProduct} style={{fontSize: 'large'}} twoToneColor="#fa8c16"/>
      ]
    } else {
      return [
        <ShoppingCartOutlined style={{fontSize: 'large'}} twoToneColor="#fa8c16"/>,
      ]
    }
  }
 return(
   <MyContext.Consumer>
   {({loggedUser}) => (
  <Card
    style={{ width: 400 }}
    cover={ <img alt= { name } src={ imgURL } /> }
    actions={ action(loggedUser)}
  >
    <Meta
      title={ name }
      description={<><p>{ description }</p><p>$ {price} MXN / { measurement }</p></>}
    />
  </Card>
  )}
  </MyContext.Consumer>
 )
}

export default CardDetail