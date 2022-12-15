import React, {useRef} from 'react';
import {Modal} from 'antd';

const ChannelModal = ({visible, modalText, modalInfo, handleCancel, handleOk, confirmLoading,buttonText}) => {
    const modalRef = useRef(null);
    return (
            <Modal
                ref={modalRef}
                title="Alert"
                visible={visible}
                onOk={handleOk}
                
                onCancel={handleCancel}
                okText= {`Connect ${buttonText}`}
                cancelText="Maybe later"
            >
                <p>{modalText}</p>
                
            </Modal>
    );
};

export default ChannelModal;