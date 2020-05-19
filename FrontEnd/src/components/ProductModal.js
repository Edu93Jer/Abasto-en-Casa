import React from 'react'
import { Modal } from 'antd';
import CardDetail from './CardDetail'

function ModalDetail(props) {
  const{
   name,
   imgURL,
   // price,
   // measurement,
   description,
   modalVisible,
   handleOk,
   handleCancel,
  } = props
  return (
   <Modal
   title={ name }
   centered
   visible={ modalVisible }
   onOk={ handleOk }
   onCancel={ handleCancel}
   >
    <CardDetail
    imgURL={ imgURL }
    name={ name }
    // price={ price }
    // measurement={ measurement }
    description={ description }
    />
   </Modal>
  );
}

export default ModalDetail

// function ModalDetail() {
//  state = {
//    modalVisible: false,
//  };

//  setModalVisible(modalVisible) {
//    this.setState({ modalVisible });
//  }

//  render() {
//    return (
//      <div>
//        <EyeOutlined onClick={() => this.setModalVisible(true)}/>
//        <Modal
//          title="Nombre del Producto"
//          centered
//          visible={this.state.modalVisible}
//          onOk={() => this.setModalVisible(false)}
//          onCancel={() => this.setModalVisible(false)}
//        >
//          <CardDetail
//           imgURL={ imgURL }
//           name={ name }
//           price={ price }
//           measurement={ measurement }
//           description={ description }
//          />
//        </Modal>
//      </div>
//    );
//  }
// }
