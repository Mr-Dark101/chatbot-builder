import React, {useEffect, useState} from 'react';


// import TriggerCard from "../TreeComponent/items/TriggerCard";

import ByTypeComposer from "./byTypeComposer";



const AddTriggerComposer = (props) => {

    const [triggerType, setTriggerType] = useState('M');


    const [btnMessageStyle, setBtnMessageStyle] = useState({width:'100%'});
    const [btnApiStyle, setBtnApiStyle] = useState({width:'100%'});




    useEffect(() => {
        let tVal = 'M';
        setBtnMessageStyle({backgroundColor:'#10163A',width:'100%',color:'#fff',borderRadius: '5px 5px 0px 0px'})
            setBtnApiStyle({backgroundColor:'#fff',width:'100%',color:'#000',borderRadius: '5px 5px 0px 0px'})
        if(props.trigger.currentTriggerData.toTrigger){
            tVal = props.trigger.currentTriggerData.toTrigger.triggerType;

             setBtnMessageStyle({backgroundColor:'#fff',width:'100%',color:'#000',borderRadius: '5px 5px 0px 0px'})
            setBtnApiStyle({backgroundColor:'#10163A',width:'100%',color:'#fff',borderRadius: '5px 5px 0px 0px'})
        }
        setTriggerType(tVal)
    }, []);

    const meClick = (param) => {
        
        if(param == 'M'){
            setBtnMessageStyle({backgroundColor:'#10163A',width:'100%',color:'#fff',borderRadius: '5px 5px 0px 0px'})
            setBtnApiStyle({backgroundColor:'#fff',width:'100%',color:'#000',borderRadius: '5px 5px 0px 0px'})
        }else{

            setBtnMessageStyle({backgroundColor:'#fff',width:'100%',color:'#000',borderRadius: '5px 5px 0px 0px'})
            setBtnApiStyle({backgroundColor:'#10163A',width:'100%',color:'#fff',borderRadius: '5px 5px 0px 0px'})
        }
        setTriggerType(param)
    }

    return (
        <>
         <ul className="right_bar_top_section">
            <li>
           
                <button onClick={() => meClick('M')} className="btn btn-block {btn-primary}" style={btnMessageStyle}>Message</button>
            
            </li>
            <li>
                <button onClick={() => meClick('A')} className="btn btn-block btn-secondry" style={btnApiStyle}>API</button>
            </li>
         </ul>

            <ByTypeComposer props={props}  triggerType={triggerType} />
         </>
    );
};

export default AddTriggerComposer;