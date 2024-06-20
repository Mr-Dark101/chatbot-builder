import React, { useState, useEffect } from "react";
import Crud from "../components/crud/Crud";

const formSchema = {
    username: {
        type: "text",
        label: "Login",
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
    role_id: {
        type: "select",
        label: "Role",
        required: true,
        options: [
            {
                label: "Admin",
                value: "3"
            },
            {
                label: "User",
                value: "2"
            }
        ]
    }
}
const User = () => {


  


    
  return (
    <>

    <Crud serviceUrl={'user'} title={'User'} deleteAction={"false"} formSchema={formSchema} dataAttr={{'Super Admin':'username','Login':'username','Role':'username','Email':'email'}} />


    </>
  );
};

export default User;
