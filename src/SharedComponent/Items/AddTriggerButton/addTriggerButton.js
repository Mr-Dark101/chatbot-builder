import React from 'react';
import add_icon from "../../../assets/add-icon.svg";
import end_icon from "../../../assets/flow-end.svg";
import click_icon from "../../../assets/clickicon.svg";
import plus_icon from "../../../assets/plusicon.svg";
// const defaultState = {
//     isFocus: false
// }

const AddTriggerButton = (props) => {
    let {addTrigger, isEnd} = props;
    // let [init, setInit] = useState(defaultState);
    // let {isFocus} = init;

    return (
        <div className="add-btn-hld">
            <button className={`btn-trigger`} onClick={() => {
                // setInit({
                //     ...init,
                //     isFocus: true
                // })
                addTrigger()
            }}>
                            <span>
                                <img style = {{width: '25px', height:'25px',marginRight: '15px'}} alt={"#"} src={click_icon}/>
                            </span>
                Add Trigger
            </button>
            <button style = {{backgroundColor: 'transparent',border: 'none',marginRight: '-16px'}} onClick={() => {addTrigger()}}>
            <i class="fa fa-plus-circle" aria-hidden="true" style = {{fontSize: '20px', background: '#fff', borderRadius: '50%'}}></i>                       
            </button>
            {isEnd && (<div className="end-icon">
                <img alt={"#"} src={end_icon}/>
            </div>)}
        </div>
    );
};

export default AddTriggerButton;