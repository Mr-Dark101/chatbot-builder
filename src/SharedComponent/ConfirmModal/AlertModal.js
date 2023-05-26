import React, { useRef } from 'react';
import { Button, Modal } from 'antd';

const ConfirmModal = ({ visible, modalText, modalInfo, handleCancel, handleOk, confirmLoading, modalTitle, okText }) => {
   const modalRef = useRef(null);
   return (
      <Modal
         ref={modalRef}
         title={modalTitle ? modalTitle : 'Alert'}
         visible={visible}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
         footer={[
            <Button key="button" type="primary" onClick={handleOk}>
               {modalTitle ? okText : 'Ok'}
            </Button>,
            <Button key="back" onClick={handleCancel}>
               Cancel
            </Button>,
         ]}
      >
         <p>{modalText}</p>
         {modalInfo !== undefined && modalInfo.length > 0 && (
            <div className="">
               <p style={{ color: '#363A77', fontWeight: 'bolder' }}>Here's some information before you go ahead.</p>
               <div className="">
                  <ul>
                     {modalInfo.map((info, index) => {
                        return <li key={index}>{info}</li>;
                     })}
                  </ul>
               </div>
            </div>
         )}
      </Modal>
   );
};

export default ConfirmModal;
