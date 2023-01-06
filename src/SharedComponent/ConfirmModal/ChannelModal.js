import React, { useRef } from 'react';
import { Modal } from 'antd';

const ChannelModal = ({ visible, modalText, modalInfo, handleCancel, handleOk, confirmLoading, buttonText, modalIcon }) => {
   const modalRef = useRef(null);
   return (
      <Modal ref={modalRef} title={`Connect ${buttonText}`} visible={visible} onOk={handleOk} modalTitle={`Connect ${buttonText}`} onCancel={handleCancel} okText={`Connect ${buttonText}`} cancelText="Maybe later">
         <p style={{ textAlign: 'center' }}>
            <img src={modalIcon} />
         </p>
         <p>{modalText}</p>
      </Modal>
   );
};

export default ChannelModal;
