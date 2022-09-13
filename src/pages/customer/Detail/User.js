import React, { useState, useEffect } from "react";
import CrudUser from "../../../components/crud/CrudUser";

const formSchema = {
    username: {
        type: "text",
        label: "username",
        required: true,
    },
     password: {
        type: "text",
        label: "Password",
        required: true
    },
    email: {
        type: "email",
        label: "Email",
        required: true
    },

    name: {
        type: "text",
        label: "name",
        required: true
    }

}
const User = ({getSubPage,clinicRs}) => {


  


    
  return (
    <>

    <CrudUser row={clinicRs} master={true} serviceUrl={'user'} title={'User'} deleteAction={"false"} formSchema={formSchema} dataAttr={{'Super Admin':'username','Login':'username','Role':'username','Email':'email'}} />


    </>
  );
};

export default User;
