import React from 'react';
import {Modal,Button} from 'antd';

const ConfirmModalPublish = ({visible, modalText, modalInfo, handleCancel, handleOk, confirmLoading,modalTitle,okText}) => {
    return (
        <div>
            {/*<Button type="primary" onClick={showModal}>*/}
            {/*    Open Modal with async logic*/}
            {/*</Button>*/}
            <Modal
                title= {(modalTitle) ? modalTitle : "Confirmation"}
                visible={visible}
                onOk={handleOk}
                okText= {(modalTitle) ? okText : "Yes"}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                headerStyle={{ backgroundColor: '#000' }}
                centered={`true`}

                footer={[
                     
                      <Button key="button" type="primary"  onClick={handleOk}>
                       {(modalTitle) ? okText : "Yes"}
                      </Button>,
                       <Button key="back" onClick={handleCancel}>
                        Cancel
                      </Button>,
                     
        ]}
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

export default ConfirmModalPublish;