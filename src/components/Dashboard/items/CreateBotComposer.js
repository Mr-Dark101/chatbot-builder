import React, { useEffect, useState } from 'react';
import { Modal } from "@mui/material";
import whatsAppIcon from "../../../assets/Image 1/logos_whatsapp-icon.svg";
// import TextField from "../../crud/FormElements";
import whatsAppIconWhite from "../../../assets/whatsapp.png";
import MessengerIcon from "../../../assets/Image 1/logos_messenger.svg";
import InstagramIcon from "../../../assets/insta.png";
import GoogleIcon from "../../../assets/google.png";
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
                            data !== null ? "Update Bot" : !selectCategory ? "Create your bot" : "Create your bot"
                        }
                    </div>
                </div>
                <div className="header-rt" />
            </div>

           
            <div className="modal-section">
              
              <div className="row">
                 <div className="col-sm-12">
                    <label>Bot Name</label>
                    <input className="inp" placeholder={"Enter ChatBot Name"} value={botName}
                                                onChange={(e) => {
                                                    setInit({
                                                        ...init,
                                                        botName: e.target.value
                                                    })
                                                }} />
                 </div>
              </div>
              <br />
              <div className="row">
                <div className="col-sm-12">
                   
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
                                }} className={`category-box ${init.selected.includes('googlemsg') && "on-facebook"}`}
                                      onClick={() => handleSelectBot('googlemsg')}

                                >
                                    <div className={`icon on-messenger-app`}>
                                        <img alt="Facebook" src={comingSoon ? comingSoonIcon : GoogleIcon} style={{width: '78px',height: '78px'}} />
                                    </div>
                                    
                                </div>
                               
                            </div>

                            <br />
                             <textarea placeholder={"Enter ChatBot Description"}
                                    onChange={(e) => {
                                                    setInit({
                                                        ...init,
                                                        botDescription: e.target.value
                                                    })
                                                }}

                             >{botDescription}</textarea>
                             
                 </div>
                 </div>      
                        

               
            </div>

            
            <div className="modal-footer">
                <div className="actions">
                    
                   
                            <button className="btn filled"
                                onClick={handleCreateBotSubmit}>{data !== null ? "Update" : "Create"}</button>
                    
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