import React, {useEffect, useState} from 'react';


// import TriggerCard from "../TreeComponent/items/TriggerCard";

import ByTypeComposer from "./byTypeComposer";



const AddTriggerComposer = ({props,apiHandleConditionMaster}) => {

    const [triggerType, setTriggerType] = useState('A');


    const [btnMessageStyle, setBtnMessageStyle] = useState({width:'100%'});
    const [btnApiStyle, setBtnApiStyle] = useState({width:'100%'});




 

    
    return (
        <>
        
            <ByTypeComposer props={props} apiHandleConditionMaster={apiHandleConditionMaster}  triggerType={triggerType} />
         </>
    );
};

export default AddTriggerComposer;