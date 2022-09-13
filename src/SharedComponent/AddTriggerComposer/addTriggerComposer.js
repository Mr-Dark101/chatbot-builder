import React, {useEffect, useState} from 'react';


// import TriggerCard from "../TreeComponent/items/TriggerCard";

import ByTypeComposer from "./byTypeComposer";



const AddTriggerComposer = (props) => {

    const [triggerType, setTriggerType] = useState('M');


    const [btnMessageStyle, setBtnMessageStyle] = useState({width:'100%'});
    const [btnApiStyle, setBtnApiStyle] = useState({width:'100%'});




    useEffect(() => {
        let tVal = 'M';
        setBtnMessageStyle({backgroundColor:'#363A77',width:'100%',color:'#fff'})
            setBtnApiStyle({backgroundColor:'#fff',width:'100%',color:'#000'})
        if(props.trigger.currentTriggerData.toTrigger){
            tVal = props.trigger.currentTriggerData.toTrigger.triggerType;

             setBtnMessageStyle({backgroundColor:'#fff',width:'100%',color:'#000'})
            setBtnApiStyle({backgroundColor:'#363A77',width:'100%',color:'#fff'})
        }
        setTriggerType(tVal)
    }, []);

    const meClick = (param) => {
        
        if(param == 'M'){
            setBtnMessageStyle({backgroundColor:'#363A77',width:'100%',color:'#fff'})
            setBtnApiStyle({backgroundColor:'#fff',width:'100%',color:'#000'})
        }else{

            setBtnMessageStyle({backgroundColor:'#fff',width:'100%',color:'#000'})
            setBtnApiStyle({backgroundColor:'#363A77',width:'100%',color:'#fff'})
        }
        setTriggerType(param)
    }

    return (
        <>
         <div className="row">
                            <div className="col-sm-6">
                           
                                <button onClick={() => meClick('M')} className="btn btn-block {btn-primary}" style={btnMessageStyle}>Message</button>
                            
                            </div>
                            <div className="col-sm-6">
                                <button onClick={() => meClick('A')} className="btn btn-block btn-secondry" style={btnApiStyle}>API</button>
                            </div>
         </div>

            <ByTypeComposer props={props} triggerType={triggerType} />
         </>
    );
};

export default AddTriggerComposer;