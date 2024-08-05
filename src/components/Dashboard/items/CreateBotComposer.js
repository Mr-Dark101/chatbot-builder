import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import whatsAppIcon from '../../../assets/Image 1/logos_whatsapp-icon.svg';
// import TextField from "../../crud/FormElements";
import whatsAppIconWhite from '../../../assets/whatsapp.png';
import MessengerIcon from '../../../assets/Image 1/logos_messenger.svg';
import InstagramIcon from '../../../assets/insta.png';
import GoogleIcon from '../../../assets/google.png';
// import facebookIcon from "../../../assets/facebook-icon.png";
import comingSoonIcon from '../../../assets/whatsapp.png';
import sampleExample from '../../../assets/example.jpeg';

// import messengerIcon from "../../../assets/Icon awesome-facebook-messenger.svg";
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { createUserBot, updateUserBot, getChannelVerify } from '../slices/dashboard.slice';
import AlertModal from '../../../SharedComponent/ConfirmModal/ChannelModal';
import ConfirmModal from '../../../SharedComponent/ConfirmModal/ConfirmModal';
import { fontWeight, width } from '@mui/system';
import SweetAlert from 'react-bootstrap-sweetalert';
const defaultState = {
   isConfirm: false,
   isAlert: false,
   openComposer: false,
   openChatBot: false,
   buttonText: '',
   selected: ['whatsapp'],
   selectCategory: false,
   comingSoon: false,
   botName: '',
   botImage: null,
   botDescription: '',
   botPhoneNumber: '',
   botId: null,
   onHover: false,
   confirmationTxt: '',
   icon: '',
   confirmationInfo: [],
};

const CreateBotComposer = (props) => {
   let { openModal, onClose, currentUser, data,botType } = props;

   const [showAlert, setShowAlert] = useState(false);

   const [init, setInit] = useState(defaultState);
   let { selected, selectCategory, botName, botDescription, botPhoneNumber, botImage, botId, comingSoon, onHover, isAlert,isConfirm, isUpdatedList, confirmationTxt, icon, confirmationInfo, buttonText } = init;
   const dispatch = useDispatch();


   let titleName = 'Create a Bot';
   if(botType == 3){
      titleName = 'Create a GPT Bot'
   } else if(botType == 4){
      titleName = 'Create a Hybrid Bot'
   }

   useEffect(() => {
      let dropArea = document.getElementById('drop-area');
      $(document).ready(() => {
         if (dropArea !== null) {
            const preventsDefaults = (e) => {
               e.preventDefault();
               e.stopPropagation();
            };
            const highlighted = (e) => {
               dropArea.classList.add('highlight');
            };
            const unHighlighted = (e) => {
               dropArea.classList.remove('highlight');
            };
            const handleDrop = (e) => {
               let dt = e.dataTransfer;
               let files = dt.files;
               handleFileUpload(files, 1);
            };
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
               dropArea.addEventListener(eventName, preventsDefaults, false);
            });
            ['dragover', 'dragenter'].forEach((eventName) => {
               dropArea.addEventListener(eventName, highlighted, false);
            });
            ['dragleave', 'drop'].forEach((eventName) => {
               dropArea.addEventListener(eventName, unHighlighted, false);
            });
            dropArea.addEventListener('drop', handleDrop, false);
         }
      });

      if (data !== null) {
         setInit({
            ...init,
            botName: data.name,
            botDescription: data.description !== null ? data.description : '',
            botPhoneNumber: data.phoneNumber,
            selectCategory: true,
            botId: data.id,
            selected: data.channels !== null ? JSON.parse(data.channels) : ['whatsapp'],
         });
      } else {
         setInit({
            ...init,

            selected: ['whatsapp'],
         });
      }
   }, [data]);

   const handleCloseModal = () => {
      onClose();
      setInit({
         ...init,
         selectCategory: false,
      });
   };
   const handleSelectCategorySubmit = () => {
      setInit({
         ...init,
         selectCategory: true,
      });
   };
   const handleCreateBotSubmit = () => {
      alertConfirmClose();
      // console.log('HandleCreateBotSubmit: ' + localStorage.getItem('org_unit_id'));
      let createObj = {
         name: botName,
         phoneNumber: botPhoneNumber,
         description: botDescription,
         channels: JSON.stringify(selected),
         //userId: localStorage.getItem('tenent_id'),
         userId: localStorage.getItem('org_unit_id'),
         tenent_id: localStorage.getItem('tenent_id'),
         imagePath: botImage,
         type_id: botType,
      };
      if (data !== null) {
         let updateObj = {
            botId: botId,
            name: botName,
            phoneNumber: botPhoneNumber,
            description: botDescription,
            channels: JSON.stringify(selected),
            userId: currentUser,
            imagePath: botImage,
         };
         if (botName !== '') {
            dispatch(updateUserBot(updateObj));
            onClose();
         } else {
         }
         // console.log('updateObj_', updateObj)
      } else {
         if (botName !== '') {
            dispatch(createUserBot(createObj));
            onClose();
         } else {
         }
      }
   };

   const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
         icon: '',
      });
   };

   const alertConfirmClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
         icon: '',
      });
   };

   const alertCloseLink = () => {
      window.open('https://eoceanwab.com/eoceanwab/channels/index', '_blank', 'noopener,noreferrer');
      setInit({
         ...init,
         isAlert: false,
         isConfirm: false,
         isUpdatedList: true,
         confirmationTxt: '',
         icon: '',
      });
   };

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
               $('.preview_img').remove();
               let img = document.createElement('img');
               img.src = reader.result;
               img.className = 'preview_img';
               document.getElementById('drop-area').appendChild(img);
            };
            reader.readAsDataURL(file);
         });
      } else {
         if (files.target.files && files.target.files[0]) {
            let file = files.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
               // setInit({
               //     ...init,
               //     botImage: reader.result
               // })
               $('.preview_img').remove();
               let img = document.createElement('img');
               img.src = reader.result;
               img.className = 'preview_img';
               document.getElementById('drop-area').appendChild(img);
            };
            reader.readAsDataURL(file);
         }
      }
   };

   const handleSelectBot = async (category, categoryText, icon) => {
      let apiReturn = false;
      if (category != 'whatsapp') {
         let apiResponse = await dispatch(getChannelVerify(category));
         apiResponse = JSON.stringify(apiResponse);
         apiReturn = JSON.parse(apiResponse);
         if (apiReturn.error) {
            if (init.selected.includes(category)) {
               if (category === 'googlemsg') {
                  setInit({
                     ...init,
                     isAlert: false,
                     isConfirm: false,
                     buttonText: categoryText,
                     icon: icon,
                     confirmationTxt: `Before you can add chatbot to Google's Business Messages, you need to add a Google's Business Messages account.`,
                     selected: init.selected.filter((d) => d !== category),
                  });
               } else {
                  setInit({
                     ...init,
                     isAlert: false,
                     isConfirm: false,
                     buttonText: categoryText,
                     icon: icon,
                     confirmationTxt: `Before you can add chatbot to ${categoryText}, you need to connect a ${categoryText} page.`,
                     selected: init.selected.filter((d) => d !== category),
                  });
               }
            } else {
               if (category === 'googlemsg') {
                  setInit({
                     ...init,
                     isAlert: true,
                     isConfirm: false,
                     buttonText: categoryText,
                     icon: icon,
                     confirmationTxt: `Before you can add chatbot to Google's Business Messages, you need to add a Google's Business Messages account.`,
                     selected: [...init.selected, category],
                  });
               } else {
                  setInit({
                     ...init,
                     isAlert: true,
                     isConfirm: false,
                     buttonText: categoryText,
                     icon: icon,
                     confirmationTxt: `Before you can add chatbot to ${categoryText}, you need to connect a ${categoryText} page.`,
                     selected: [...init.selected, category],
                  });
               }
            }
         } else {
            if (init.selected.includes(category)) {
               setInit({
                  ...init,

                  selected: init.selected.filter((d) => d !== category),
               });
            } else {
               setInit({
                  ...init,

                  selected: [...init.selected, category],
               });
            }
         }
      }
   };

   const handleUpdate = () => {
      if (data !== null) {
         setInit({
            ...init,
            isAlert: false,
            isConfirm: true,
            modalTitle: 'Update Bot',
            okText: 'Yes',
            confirmationTxt: `Are you sure you want to update this bot?`
         });
      } else {
         handleCreateBotSubmit();        
      }
   
   }

   const openExampleModal = () => {
     setShowAlert(true)
   }

   const body = (
      <div className="modal-content home_bot_modal">
         <div className="modal-header">
            <div className="header-lft">
               <h5 style={{ fontWeight: '800', color: '#000' }} class="box-title m-0">
                  {data !== null ? 'Update Bot' : !selectCategory ? titleName : titleName}
                   
               </h5>
            </div>
            <div className="header-rt" />
         </div>

         <div className="modal-section">

            {(botType == 3) ? (
               <div className="row">
                  <div className="col-sm-12">
                        <h6 style={{fontFamily: 'Lexend Deca Light !important'}}>
                        This bot is powered by OpenAI GPT technology. 
                        <br /><br />
                        
                        This bot does not require a
predetermined flow and uses your proprietary training data to provide human like responses to user queries in a conversational manner.
<br /><br />
This bot does not reply to the user input with dynamic data from third party systems.
                        </h6>
                  </div>
               </div>

            ) : null}

{(botType == 4) ? (
               <div className="row">
                  <div className="col-sm-12">
                        <h6 style={{fontFamily: 'Lexend Deca Light !important'}}>
                        Hybrid chatbot is a combination of menu-based and GPT-based chatbot. 
                        <br /><br />
A menu-based chatbot presents users with a structured menu of options to choose from and responds according to pre-determined rules. Whereas a GPT-based chatbot uses natural language processing (NLP) to understand and respond to customer queries. Hybrid chatbot use a combination of both these technologies to deliver the best possible customer experience.<a onClick={openExampleModal} href="#"> See example.</a>
                        </h6>
                       
                  </div>
               </div>

            ) : null}
            <div className="row mt-2">
               <div className="col-sm-12">
                  <label class="mb-2">Name your bot</label>
                  <input
                     className="inp"
                     placeholder={'Provide your chatbot name'}
                     value={botName}
                     onChange={(e) => {
                        setInit({
                           ...init,
                           botName: e.target.value,
                        });
                     }}
                  />
               </div>
            </div>
            <br />

            <label class="mb-2">Describe your bot</label>
           
            <textarea
               rows="3"
               placeholder={'Provide your chatbot description'}
               onChange={(e) => {
                  setInit({
                     ...init,
                     botDescription: e.target.value,
                  });
               }}
            >
               {botDescription}
            </textarea>
            <br />
            <br />
            <label class="mb-10">Where would you like to deploy your bot? Select all that apply.</label>
            <br />
            <div className="row">
               <div className="col-sm-12">
                  <div className="bot-category-holder">
                     <div
                        style={{ width: '139px', height: '142px' }}
                        className={`category-box ${init.selected.includes('whatsapp') && 'on-whats-app'}`}
                        onClick={() => handleSelectBot('whatsapp', 'WhatsApp', whatsAppIcon)}
                        onMouseOver={() => {
                           setInit({
                              ...init,
                              onHover: false,
                           });
                        }}
                        onMouseOut={() => {
                           setInit({
                              ...init,
                              onHover: false,
                           });
                        }}
                     >
                        <div className={`icon on-whats-app`}>
                           <img className="img-responsive mb-20" alt="WhatsApp" src={!onHover ? whatsAppIcon : whatsAppIconWhite} style={{ width: '42px', height: '42px' }} />
                        </div>
                        <label id="whatsapp" class="mb-10" style={{ color: '#fff' }}>
                           WhatsApp
                        </label>
                     </div>
                     <div
                        style={{ width: '139px', height: '142px' }}
                        onMouseOver={() => {
                           setInit({
                              ...init,
                              comingSoon: false,
                           });
                        }}
                        onMouseOut={() => {
                           setInit({
                              ...init,
                              comingSoon: false,
                           });
                        }}
                        className={`category-box ${init.selected.includes('messenger') && 'on-facebook'}`}
                        onClick={() => handleSelectBot('messenger', 'Facebook Messenger', MessengerIcon)}
                     >
                        <div className={`icon on-messenger-app mt-10`}>
                           <img alt="Facebook" src={comingSoon ? comingSoonIcon : MessengerIcon} style={{ width: '42px', height: '42px' }} />
                        </div>
                        <label id="messenger" className={`mt-20 text-center txt ${init.selected.includes('messenger') && 'on'}`}>
                           Facebook Messenger
                        </label>
                     </div>

                     <div
                        style={{ width: '139px', height: '142px' }}
                        onMouseOver={() => {
                           setInit({
                              ...init,
                              comingSoon: false,
                           });
                        }}
                        onMouseOut={() => {
                           setInit({
                              ...init,
                              comingSoon: false,
                           });
                        }}
                        className={`category-box ${init.selected.includes('instagram') && 'on-instagram'}`}
                        onClick={() => handleSelectBot('instagram', 'Instagram', InstagramIcon)}
                     >
                        <div className={`icon on-messenger-app`}>
                           <img alt="Facebook" src={comingSoon ? comingSoonIcon : InstagramIcon} style={{ width: '58px', height: '58px' }} />
                        </div>
                        <label id="instagram" className={`mb-20  txt ${init.selected.includes('instagram') && 'on'}`}>
                           Instagram
                        </label>
                     </div>

                     <div
                        style={{ width: '139px', height: '142px' }}
                        onMouseOver={() => {
                           setInit({
                              ...init,
                              comingSoon: false,
                           });
                        }}
                        onMouseOut={() => {
                           setInit({
                              ...init,
                              comingSoon: false,
                           });
                        }}
                        className={`category-box ${init.selected.includes('googlemsg') && 'on-google'}`}
                        onClick={() => handleSelectBot('googlemsg', 'Google', GoogleIcon)}
                     >
                        <div className={`icon on-messenger-app mt-10`}>
                           <img alt="Facebook" src={comingSoon ? comingSoonIcon : GoogleIcon} style={{ width: '56px', height: '56px' }} />
                        </div>
                        <label id="googlemsg" className={`mt-10 text-center txt ${init.selected.includes('googlemsg') && 'on'}`}>
                           Google's Business Messages
                        </label>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="modal-footer">
            <div className="actions">
               <button style={{ textTransform: 'none',paddingTop: '8px !important', width: '100px',height: '34px',fontSize:'13px', marginRight: 10,fontFamily: 'Lexend Deca' }} className="btn custom" onClick={handleCloseModal}>
                  Cancel
               </button>

               <button style={{ textTransform: 'none', width: '100px' }} className="btn filled" onClick={handleUpdate}>
                  {data !== null ? 'Update' : 'Next'}
               </button>
            </div>
         </div>
      </div>
   );

   const errorChannel = (
      <div className="modal-content home_bot_modal">
         <div className="modal-section">
            <div className="row">
               <div className="col-sm-12">Error</div>
            </div>
         </div>
      </div>
   );

   return (
      <>
         {showAlert && (
         <SweetAlert
               custom
              
               confirmBtnText="Close"
               cancelBtnText="Cancel"
               confirmBtnBsStyle="primary"
               cancelBtnBsStyle="light"
               customIcon=""
               customClass="containerBoxAlert"
               title="Sample Example"
               onConfirm={() => {
                  setShowAlert(false);
                  
               }}
               

                reverseButtons={true}
            >
            <img alt="Sample Example" src={sampleExample} style={{ width: '332px', height: '316px' }} />
            </SweetAlert>
            )}
         <AlertModal visible={isAlert} handleOk={alertCloseLink} confirmLoading={true} modalText={confirmationTxt} modalIcon={icon} modalInfo={confirmationInfo} buttonText={buttonText} handleCancel={alertClose} />
         <ConfirmModal style={{zIndex: '9999'}} visible={isConfirm} okText= {"Yes"} modalTitle= {(data != null) ? 'Update Bot' : 'Create Bot'} handleOk={handleCreateBotSubmit} modalText={confirmationTxt} handleCancel={alertConfirmClose} />
         
         <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="create-bot" aria-describedby="create-the-new-bot" className={'_modal'}>
            {body}
         </Modal>

      </>
   );
};

export default CreateBotComposer;
