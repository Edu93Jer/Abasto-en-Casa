import React from 'react'

import { Carousel } from 'antd';

function CarouselHome() {
  return (
    <Carousel autoplay>
      <div className='Carousel'>
        <img
          src='https://res.cloudinary.com/abasto-en-casa/image/upload/v1590090920/AbastoProducts/Logo_01_1_xpdqqj.png'
          alt='Carousel1'
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div className='Carousel'>
        <img
          src='https://res.cloudinary.com/abasto-en-casa/image/upload/v1590090918/AbastoProducts/en_apoyo_a_los_agriculotres_mexicanos_kvyxn4.png'
          alt='Carousel2'
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div className='Carousel'>
        <img
          src='https://res.cloudinary.com/abasto-en-casa/image/upload/v1590090915/AbastoProducts/tomato-1205699_1920_1_uwhxjw.png'
          alt='Carousel3'
          style={{ height: '100%', width: '100%' }}
        />
      </div>
      <div className='Carousel'>
        <img
          src='https://res.cloudinary.com/abasto-en-casa/image/upload/v1590090914/AbastoProducts/nosotros_lo_llevamos_por_ti_nnq3xu.png'
          alt='Carousel4'
          style={{ height: '100%', width: '100%' }}
        />
      </div>

    </Carousel>
  )
}

export default CarouselHome