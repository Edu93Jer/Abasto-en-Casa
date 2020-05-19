import React from 'react'

import { Card } from 'antd';
import { EditTwoTone, ShoppingCartOutlined , CloseSquareTwoTone } from '@ant-design/icons';

const { Meta } = Card;

function CardDetail({ imgURL, name, price, measurement, description}){
 return(
  <Card
    style={{ width: 400 }}
    cover={ <img alt= { name } src={ imgURL } /> }
    actions={[
     <EditTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16"/>,
      <ShoppingCartOutlined style={{fontSize: 'large'}} twoToneColor="#fa8c16"/>,
      <CloseSquareTwoTone style={{fontSize: 'large'}} twoToneColor="#fa8c16"/>,
    ]}
  >
    <Meta
      title={ name }
      description={ <><p>wwfsf</p><p>$ {price}</p> <p>{description}</p></>}
    />
  </Card>
 )
}

export default CardDetail

// description={{ description } <br/> <p></p>${price} "MXN" { measurement }}