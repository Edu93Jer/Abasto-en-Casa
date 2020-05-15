import React from "react";

import { Card } from 'antd';

const { Meta } = Card;

function ProductCard({ imageURL, name, price, measurement}) {
  return(
    <Card className="productCard"
      hoverable
      style={{ width: 220}}
      cover={<img alt={ name } src={ imageURL } />}
    >
      <Meta title={ name } description={`$${price}.00 : ${measurement}`} />
    </Card>
  )
}

export default ProductCard