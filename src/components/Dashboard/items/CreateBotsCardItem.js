import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
// import {SetUpdateBotData} from "../slices/dashboard.slice";
// import $ from "jquery";
import {Avatar as Av} from "@mui/material";
// import MenusComponent from "../../../SharedComponent/Menus";

const defaultState = {
    onHover: false,
}

const menusOptions = [{text: "Update", value: 1}, {text: "Delete", value: 2}, {text: "Activate", value: 3}]

const CreateBotsCardItem = (props) => {
    let {selected, data, onClick} = props;
    let {id, icon_1, icon_2, name, userId} = data;
    const [init, setInit] = useState(defaultState);
    let {
        //openOpt, openComposer, currentUser,
        onHover} = init;
    // const dispatch = useDispatch();
    // const history = useHistory();

    useEffect(() => {
        // $(document).ready(() => {
        //     $("body").on("click", (e) => {
        //         setInit({
        //             ...init,
        //             openOpt: false
        //         })
        //     })
        // })
    }, [init])

    // const handleMoreOpt = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     setInit({
    //         ...init,
    //         openOpt: true
    //     })
    // }

    // const handleActivateBot = (obj) => {
    //     // dispatch(DeleteUserBot(obj));
    // }
    // const handleUpdate = (obj) => {
    //     dispatch(SetUpdateBotData(obj))
    // }

    // const handleBotOpen = (id) => {
    //
    // }

    // const handleMenuSelect = (value) => {
    //     switch (value) {
    //         case 1:
    //             handleUpdate(data)
    //             break;
    //         case 2:
    //             onDelete({
    //                 id, userId
    //             });
    //             break;
    //         case 3:
    //             handleActivateBot({botId: id, userId})
    //             break;
    //         default :
    //             return;
    //     }
    // }


    return (
        <div className={`card ${selected && "on"}`} style={{
            width: "208px",
        }} onClick={() => onClick(id)} onMouseOver={()=>{
            setInit({
                ...init,
                onHover: true
            });
        }}
             onMouseOut={()=>{
                 setInit({
                     ...init,
                     onHover: false
                 })
             }}
        >

            <div className="card-content">
                <div className="card-start justify-content-center pt-4 pb-4" >
                    <div className="card-circle on" style={{
                        backgroundColor: "initial", border: "none",
                        width: "60px", height: "60px"
                    }}>
                        <Av
                            sx={{ width: 60, height: 60 }}
                            src={!onHover ? icon_1 : icon_2}
                        />
                    </div>
                </div>
                <div className="card-center">
                    <div className="txt text-wrap text-center" style={{
                        fontSize: "14px"
                    }}>{name}</div>
                    {/*<div className="sub-txt">{phoneNumber}</div>*/}
                </div>
                <div className="card-ends">
                    <div className="icon">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBotsCardItem;