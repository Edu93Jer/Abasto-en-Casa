import React from 'react'
import { Modal } from 'antd';
import CardDetail from './CardDetail'

function ModalDetail(props) {
  const{
   name,
   _id,
   imgURL,
   price,
   measurement,
   description,
   removeProduct,
   addToCart,
   modalVisible,
   handleOk,
   handleCancel,
  } = props
  return (
   <Modal
   style={{top: 15, display:'flex'}}
   visible={ modalVisible }
   onOk={ handleOk }
   onCancel={ handleCancel}
   >
    <CardDetail
    imgURL={ imgURL }
    name={ name }
    price={ price }
    measurement={ measurement }
    description={ description }
    _id= { _id }
    removeProduct={ removeProduct }
    addToCart={ addToCart }
    />
   </Modal>
  );
}

export default ModalDetail

