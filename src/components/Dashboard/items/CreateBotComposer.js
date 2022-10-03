import React, { useEffect, useState } from 'react';
import { Modal } from "@mui/material";
import whatsAppIcon from "../../../assets/Image 1/logos_whatsapp-icon.svg";
// import TextField from "../../crud/FormElements";
import whatsAppIconWhite from "../../../assets/whatsapp.png";
import MessengerIcon from "../../../assets/Image 1/logos_messenger.svg";
import InstagramIcon from "../../../assets/Image 1/insta_icon.svg";
// import facebookIcon from "../../../assets/facebook-icon.png";
import comingSoonIcon from "../../../assets/whatsapp.png";
// import messengerIcon from "../../../assets/Icon awesome-facebook-messenger.svg";
import $ from "jquery";
import { useDispatch } from "react-redux";
import { createUserBot, updateUserBot } from "../slices/dashboard.slice";

const defaultState = {
    selected: ["whatsapp"],
    selectCategory: false,
    comingSoon: false,
    botName: "",
    botImage: null,
    botDescription: "",
    botPhoneNumber: "",
    botId: null,
    onHover: false,
}

const CreateBotComposer = (props) => {
    let { openModal, onClose, currentUser, data } = props;
    const [init, setInit] = useState(defaultState);
    let { selected, selectCategory, botName, botDescription, botPhoneNumber, botImage, botId, comingSoon, onHover } = init;
    const dispatch = useDispatch();

    useEffect(() => {
        let dropArea = document.getElementById("drop-area");
        $(document).ready(() => {
            if (dropArea !== null) {
                const preventsDefaults = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }
                const highlighted = (e) => {
                    dropArea.classList.add("highlight")
                }
                const unHighlighted = (e) => {
                    dropArea.classList.remove("highlight")
                }
                const handleDrop = (e) => {
                    let dt = e.dataTransfer;
                    let files = dt.files;
                    handleFileUpload(files, 1)
                }
                ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
                    dropArea.addEventListener(eventName, preventsDefaults, false);
                });
                ["dragover", "dragenter"].forEach((eventName) => {
                    dropArea.addEventListener(eventName, highlighted, false);
                });
                ["dragleave", "drop"].forEach((eventName) => {
                    dropArea.addEventListener(eventName, unHighlighted, false);
                });
                dropArea.addEventListener("drop", handleDrop, false)
            }
        });

        if (data !== null) {
            setInit({
                ...init,
                botName: data.name,
                botDescription: data.description !== null ? data.description : "",
                botPhoneNumber: data.phoneNumber,
                selectCategory: true,
                botId: data.id
            })
        }

    }, [data])

    const handleCloseModal = () => {
        onClose();
        setInit({
            ...init,
            selectCategory: false
        })
    }
    const handleSelectCategorySubmit = () => {
        setInit({
            ...init,
            selectCategory: true
        })
    }
    const handleCreateBotSubmit = () => {
        let createObj = {
            name: botName,
            phoneNumber: botPhoneNumber,
            description: botDescription,
            channels:JSON.stringify(selected),
            userId: localStorage.getItem('tenent_id'),
            imagePath: botImage
        };
        if (data !== null) {
            let updateObj = {
                botId: botId,
                name: botName,
                phoneNumber: botPhoneNumber,
                description: botDescription,
                userId: currentUser,
                imagePath: botImage
            };
            // console.log('updateObj_', updateObj)
            dispatch(updateUserBot(updateObj));
        } else {
            dispatch(createUserBot(createObj));
        }
        onClose();
    }

    const handleFileUpload = (files, type) => {
        if (type === 1) {
            let all = [...files];
            all.forEach((file) => {
                let reader = new FileReader();
                reader.onloadend = () => {
                    // setInit({
                    //     ...init,
                    //     botImage: reader.result
                    // })
                    $(".preview_img").remove();
                    let img = document.createElement('img');
                    img.src = reader.result;
                    img.className = "preview_img"
                    document.getElementById('drop-area').appendChild(img);
                }
                reader.readAsDataURL(file);
            })
        } else {
            if (files.target.files && files.target.files[0]) {
                let file = files.target.files[0];
                let reader = new FileReader();
                reader.onloadend = () => {
                    // setInit({
                    //     ...init,
                    //     botImage: reader.result
                    // })
                    $(".preview_img").remove();
                    let img = document.createElement('img');
                    img.src = reader.result;
                    img.className = "preview_img"
                    document.getElementById('drop-area').appendChild(img);
                }
                reader.readAsDataURL(file);
            }
        }


    }

    const handleSelectBot = (category) => {
        

         if(init.selected.includes(category)){
            setInit({
                ...init,
                
                selected: init.selected.filter((d) => d !== category)
            })


       
         }else{

             setInit({
                ...init,
               
                selected: [...init.selected, category]
            })

         }
        
         

    }

    const body = (
        <div className="modal-content home_bot_modal">
            <div className="modal-header">
                <div className="header-lft">
                    <div className="txt">
                        {
                            data !== null ? "Update Bot" : !selectCategory ? "Where would you like to deploy your Bot?" : "Create your bot"
                        }
                    </div>
                </div>
                <div className="header-rt" />
            </div>

           
            <div className="modal-section">
                {
                    !selectCategory ?
                        (
                            <div className="bot-category-holder">
                           
                                <div style={{ width: '119px',height: '122px' }}
                                    className={`category-box ${init.selected.includes('whatsapp') && "on-whats-app"}`}
                                    onClick={() => handleSelectBot('whatsapp')}
                                    onMouseOver={() => {
                                        setInit({
                                            ...init,
                                            onHover: false
                                        })
                                    }} onMouseOut={() => {
                                        setInit({
                                            ...init,
                                            onHover: false
                                        })
                                    }}>
                                    <div className={`icon on-whats-app`}>
                                        <img className="img-responsive" alt="WhatsApp" src={!onHover ? whatsAppIcon : whatsAppIconWhite} style={{width: '52px',height: '52px'}} />
                                    </div>
                                    <div className={`txt ${init.selected.includes('whatsapp') && "on"}`}>
                                        WhatsApp
                                    </div>
                                </div>
                                <div style={{ width: '119px',height: '122px' }} onMouseOver={() => {
                                    setInit({
                                        ...init,
                                        comingSoon: false
                                    })
                                }} onMouseOut={() => {
                                    setInit({
                                        ...init,
                                        comingSoon: false
                                    })
                                }} className={`category-box ${init.selected.includes('messenger') && "on-facebook"}`}
                                     onClick={() => handleSelectBot('messenger')}

                                >
                                    <div className={`icon on-messenger-app`}>
                                        <img alt="Facebook" src={comingSoon ? comingSoonIcon : MessengerIcon} style={{width: '52px',height: '52px'}} />
                                    </div>
                                    <div className={`txt ${init.selected.includes('messenger') && "on"}`}>
                                        {comingSoon ? "Coming Soon" : "Messenger"}
                                    </div>
                                </div>

                                <div style={{ width: '119px',height: '122px' }} onMouseOver={() => {
                                    setInit({
                                        ...init,
                                        comingSoon: false
                                    })
                                }} onMouseOut={() => {
                                    setInit({
                                        ...init,
                                        comingSoon: false
                                    })
                                }} className={`category-box ${init.selected.includes('instagram') && "on-facebook"}`}
                                      onClick={() => handleSelectBot('instagram')}

                                >
                                    <div className={`icon on-messenger-app`}>
                                        <img alt="Facebook" src={comingSoon ? comingSoonIcon : InstagramIcon} style={{width: '78px',height: '78px'}} />
                                    </div>
                                    <div className={`txt ${init.selected.includes('instagram') && "on"}`}>
                                        {comingSoon ? "Coming Soon" : "Instagram"}
                                    </div>
                                </div>
                                {/*<div className={`category-box ${selected === "ma" && "on-messenger-app"}`}*/}
                                {/*     onClick={() => handleSelectBot("ma")}>*/}
                                {/*    <div className={`icon on-messenger-app`}>*/}
                                {/*        <img alt="Messenger" src={messengerIcon}/>*/}
                                {/*    </div>*/}
                                {/*    <div className={`txt ${selected === "ma" && "on"}`}>*/}
                                {/*        Messenger Bot*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        ) :
                        <div className="form-holder">
                            <div className="input-group">
                                <div className="row__" style={{marginRight: '20px'}}>
                                    <div className="txt-field">
                                        <div className="label">
                                            <div className="txt" style={{ color: "#363A77", fontWeight: "bolder" }}>Name
                                                Your ChatBot
                                            </div>
                                            <div className="sub-txt" style={{ fontWeight: "normal",whiteSpace: 'pre-line',marginTop: '10px' }}>
                                                This name identifies your chatbot and is only available to you and your
                                                team in Digital Connect
                                            </div>
                                        </div>
                                        <div className="input">
                                            <input className="inp" placeholder={"Enter ChatBot Name"} value={botName}
                                                onChange={(e) => {
                                                    setInit({
                                                        ...init,
                                                        botName: e.target.value
                                                    })
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row__">
                                    <div className="txt-field">
                                        <div className="label">
                                            <div className="txt"
                                                style={{ color: "#363A77", fontWeight: "bolder" }}>ChatBot Description
                                            </div>
                                            <div className="sub-txt" style={{ fontWeight: "normal",whiteSpace: 'pre-line',marginTop: '10px' }}>
                                                This is an internal description that is only available to you and your
                                                team in Digital Connect
                                            </div>
                                        </div>
                                        <div className="input">
                                            <input className="inp" placeholder={"Enter ChatBot Description"}
                                                value={botDescription} onChange={(e) => {
                                                    setInit({
                                                        ...init,
                                                        botDescription: e.target.value
                                                    })
                                                }} />
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="row__">*/}
                                {/*    <div className="txt-field">*/}
                                {/*        <div className="label">*/}
                                {/*            <div className="sub-txt">*/}
                                {/*                Phone Number to access for WhatsApp*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className="input">*/}
                                {/*            <input className="inp" type={"number"} value={botPhoneNumber}*/}
                                {/*                   onChange={(e) => {*/}
                                {/*                       setInit({*/}
                                {/*                           ...init,*/}
                                {/*                           botPhoneNumber: e.target.value*/}
                                {/*                       })*/}
                                {/*                   }}/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="row__">*/}
                                {/*    <div className="heading">*/}
                                {/*        <div className="label">*/}
                                {/*            <div className="sub-txt">*/}
                                {/*                Bot Image*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div id="drop-area" className="upload-media" style={{height: "150px"}}>*/}
                                {/*        /!*    <div className="up-txt">*!/*/}
                                {/*        /!*<span>*!/*/}
                                {/*        /!*    <img alt={"#"} src={upload_icon}/>*!/*/}
                                {/*        /!*</span>*!/*/}
                                {/*        /!*        <div className="txt">*!/*/}
                                {/*        /!*            Drag here OR*!/*/}
                                {/*        /!*        </div>*!/*/}
                                {/*        /!*    </div>*!/*/}
                                {/*        <div className="actions" style={{zIndex: "3"}}>*/}
                                {/*            <label htmlFor="upload-input">*/}
                                {/*                <div className="btn-upload">Upload File</div>*/}
                                {/*            </label>*/}
                                {/*            <input id="upload-input" className="upload-input" type="file"*/}
                                {/*                   accept=".jpg, .jpeg, .gif, .bmp, .png"*/}
                                {/*                   onChange={e => handleFileUpload(e, 2)}/>*/}

                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>

                }
            </div>

            
            <div className="modal-footer">
                <div className="actions">
                    <button className="btn transparent" onClick={handleCloseModal}>Cancel</button>
                    {
                        !selectCategory ?
                            <button className="btn filled" onClick={handleSelectCategorySubmit}>Continue</button> :
                            <button className="btn filled"
                                onClick={handleCreateBotSubmit}>{data !== null ? "Update" : "Create"}</button>
                    }
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="create-bot"
            aria-describedby="create-the-new-bot"
            className={"_modal"}
        >
            {body}
        </Modal>
    );
};

export default CreateBotComposer;