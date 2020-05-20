import React from "react";

import { Card } from 'antd';

const { Meta } = Card;

function ProductCard({ imgURL, name, price, measurement, onClick}) {
  return(
    <Card
    className="productCard"
      hoverable
      style={{ width: 231}}
      cover={<img alt={ name } src={ imgURL } />}
      onClick= {() => onClick() }
    >
      <Meta title={ name } description={`$${price.toFixed(2)} / ${measurement}` } />
    </Card>
  )
}

export default ProductCard