import React from 'react';
import add_icon from "../../../assets/add-icon.svg";
import end_icon from "../../../assets/flow-end.svg";

// const defaultState = {
//     isFocus: false
// }

const AddTriggerButton = (props) => {
    let {addTrigger, isEnd} = props;
    // let [init, setInit] = useState(defaultState);
    // let {isFocus} = init;

    return (
        <div className="add-btn-hld">
            <button className={`btn-outlined`} onClick={() => {
                // setInit({
                //     ...init,
                //     isFocus: true
                // })
                addTrigger()
            }}>
                            <span>
                                <img alt={"#"} src={add_icon}/>
                            </span>
                Add Trigger
            </button>
            {isEnd && (<div className="end-icon">
                <img alt={"#"} src={end_icon}/>
            </div>)}
        </div>
    );
};

export default AddTriggerButton;