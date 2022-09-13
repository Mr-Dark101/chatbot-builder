import React from 'react';
import {Modal} from 'antd';

const ConfirmModal = ({visible, modalText, modalInfo, handleCancel, handleOk, confirmLoading}) => {
    return (
        <div>
            {/*<Button type="primary" onClick={showModal}>*/}
            {/*    Open Modal with async logic*/}
            {/*</Button>*/}
            <Modal
                title="Confirmation"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
                {
                    modalInfo !== undefined && modalInfo.length > 0 && (
                        <div className="">
                            <p style={{color:"#363A77",fontWeight:"bolder"}}>Here's some information before you go ahead.</p>
                            <div className="">
                                <ul>
                                    {
                                        modalInfo.map((info, index) => {
                                            return (
                                                <li key={index}>{info}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                }
            </Modal>
        </div>
    );
};

export default ConfirmModal;