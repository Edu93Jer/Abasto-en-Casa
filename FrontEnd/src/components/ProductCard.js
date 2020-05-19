import React from "react";

import { Card } from 'antd';

const { Meta } = Card;

function ProductCard({ imgURL, name, price, measurement, onClick}) {
  return(
    <Card
    className="productCard"
      hoverable
      style={{ width: 220}}
      cover={<img alt={ name } src={ imgURL } />}
      onClick= {() => onClick() }
    >
      <Meta title={ name } description={`$${price}.00 : ${measurement}` } />
    </Card>
  )
}

export default ProductCard