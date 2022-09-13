import React, { useState, useEffect } from "react";
import Crud from "../../../components/crud/Crud";
import CrudService from "../../../services/crud.service";

const DrugList = () => {

const [formList, setFormList] = useState([]);
const [routeList, setRouteList] = useState([]);
const [sponserList, setSponserList] = useState([]);
const [marketingStatusList, setMarketingStatusList] = useState([]);
  
useEffect(() => {
    
    retrieveMasterList('drug_form');
    retrieveMasterList('drug_route');
    retrieveMasterList('drug_sponser');
    retrieveMasterList('marketing_status');
  }, []);
 
 
const retrieveMasterList = (url) => {
    CrudService.ListValue('master/list-value?type=' + url)
      .then(response => {
            if(url == 'drug_form'){
                setFormList(response.data);
                
            }
            if(url == 'drug_route'){
                setRouteList(response.data);
                
            }
            if(url == 'drug_sponser'){
                setSponserList(response.data);
                
            }
            if(url == 'marketing_status'){
                setMarketingStatusList(response.data);
                
            }
        })
      .catch(e => {
        console.log(e);
      });
  };


const formSchema = {
    app_no: {
        type: "text",
        label: "App No",
        required: true,
    },
    product_no: {
        type: "text",
        label: "Product No",
        required: true,
    },
     name: {
        type: "text",
        label: "Drug Name",
        required: true
    },
    active_ingredient: {
        type: "text",
        label: "Actve Ingredient",
        required: true
    },

    form_id: {
        type: "select",
        label: "form",
        required: true,
        options:formList,
    },

    route_id: {
        type: "select",
        label: "Route",
        required: true,
        options:routeList,
    },

    sponser_id: {
        type: "select",
        label: "Sponser",
        required: true,
        options:sponserList,
    },

    marketing_status_id: {
        type: "select",
        label: "Marketing Status",
        required: true,
        options:marketingStatusList,
    },
   
}

  return (
    <>

    <Crud serviceUrl={'drug'} master={true} title={'Drugs'} deleteAction={"false"} formSchema={formSchema} dataAttr={{'Name':'name','Active Ingredient':'active_ingredient','Form':'form_id'}} />


    </>
  );
};

export default DrugList;
