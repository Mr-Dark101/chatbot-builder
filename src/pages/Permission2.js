import React, { useState, useRef,useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import RolesDataService from "../services/permission.service";
import CheckButton from "react-validation/build/button";
import Crud from "../components/crud/Crud";

const required = (value) => {
  if (!value) {
    return (
      <div className="text-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Permission = () => {
 
 const form = useRef();
  const checkBtn = useRef();

const [roleData, setRoleData] = useState([]);
const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [successful, setSuccessful] = useState(false);


  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeUrl = (e) => {
    const url = e.target.value;
    setUrl(url);
  };

  useEffect(() => {
    retrieveRole();
  }, []);


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      RolesDataService.register(name, title, url).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          retrieveRole();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
    
  };

  

  const retrieveRole = () => {
    RolesDataService.getAll()
      .then(response => {
        setRoleData(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  

const RenderForm = () => {
    return (

      
      <Form onSubmit={handleRegister} ref={form}>

              
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  
                 
                  name="name"
                  value={name}
                  onChange={onChangeName}
                   validations={[required]}
                />
                <div className="help-block"></div>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={onChangeTitle}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Url</label>
                <Input
                  type="text"
                  className="form-control"
                  name="url"
                  value={url}
                  onChange={onChangeUrl}
                  validations={[required]}
                />
              </div>

             
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          
       


      
  <CheckButton style={{ display: "none" }} ref={checkBtn} />
   </Form>
    
    )

}

  return (
    <>
   
<Crud data={roleData} title={'Permission'} dataAttr={{'Name':'name','Title':'title','Url':'url'}} formData=<RenderForm /> />
    


    </>
  );
};

export default Permission;
