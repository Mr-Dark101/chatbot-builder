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
// import messengerIcon from "../../../assets/Icon awesome-facebook-messenger.svg";
import $ from 'jquery';
import { useDispatch } from 'react-redux';
import { createUserBot, updateUserBot, getChannelVerify } from '../slices/dashboard.slice';
import AlertModal from '../../../SharedComponent/ConfirmModal/ChannelModal';
import { fontWeight, width } from '@mui/system';
const defaultState = {
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
   confirmationInfo: [],
};

const CreateBotComposer = (props) => {
   let { openModal, onClose, currentUser, data } = props;

   const [init, setInit] = useState(defaultState);
   let { selected, selectCategory, botName, botDescription, botPhoneNumber, botImage, botId, comingSoon, onHover, isAlert, isUpdatedList, confirmationTxt, confirmationInfo, buttonText } = init;
   const dispatch = useDispatch();

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
         // console.log('updateObj_', updateObj)
         dispatch(updateUserBot(updateObj));
      } else {
         dispatch(createUserBot(createObj));
      }
      onClose();
   };

   const alertClose = () => {
      setInit({
         ...init,
         isAlert: false,
         isUpdatedList: true,
         confirmationTxt: '',
      });
   };

   const alertCloseLink = () => {
      window.open('https://eoceanwabaqa.com/eoceanwab/channels/index', '_blank', 'noopener,noreferrer');
      setInit({
         ...init,
         isAlert: false,
         isUpdatedList: true,
         confirmationTxt: '',
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

   const handleSelectBot = async (category, categoryText) => {
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
                     buttonText: categoryText,
                     confirmationTxt: `Before you can add chatbot to Google's Business Messages, you need to add a Google's Business Messages account.`,
                     selected: init.selected.filter((d) => d !== category),
                  });
               } else {
                  setInit({
                     ...init,
                     isAlert: false,
                     buttonText: categoryText,
                     confirmationTxt: `Before you can add chatbot to ${categoryText}, you need to connect a ${categoryText} page.`,
                     selected: init.selected.filter((d) => d !== category),
                  });
               }
            } else {
               if (category === 'googlemsg') {
                  setInit({
                     ...init,
                     isAlert: true,
                     buttonText: categoryText,
                     confirmationTxt: `Before you can add chatbot to Google's Business Messages, you need to add a Google's Business Messages account.`,
                     selected: [...init.selected, category],
                  });
               } else {
                  setInit({
                     ...init,
                     isAlert: true,
                     buttonText: categoryText,
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

   const body = (
      <div className="modal-content home_bot_modal">
         <div className="modal-header">
            <div className="header-lft">
               <h4 style={{ fontWeight: '800', color: '#000' }} class="box-title m-0">
                  {data !== null ? 'Update Bot' : !selectCategory ? 'Create a bot' : 'Create a bot'}
               </h4>
            </div>
            <div className="header-rt" />
         </div>

         <div className="modal-section">
            <div className="row">
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
               rows="6"
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
                        onClick={() => handleSelectBot('whatsapp', 'WhatsApp')}
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
                        onClick={() => handleSelectBot('messenger', 'Facebook Messenger')}
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
                        onClick={() => handleSelectBot('instagram', 'Instagram')}
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
                        onClick={() => handleSelectBot('googlemsg', 'Google')}
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
               <button style={{ textTransform: 'none', width: '100px' }} className="btn filled" onClick={handleCreateBotSubmit}>
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
         <AlertModal visible={isAlert} handleOk={alertCloseLink} confirmLoading={true} modalText={confirmationTxt} modalInfo={confirmationInfo} buttonText={buttonText} handleCancel={alertClose} />
         <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="create-bot" aria-describedby="create-the-new-bot" className={'_modal'}>
            {body}
         </Modal>
      </>
   );
};

export default CreateBotComposer;
