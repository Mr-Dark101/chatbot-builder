import React, { useState, useRef, useContext, useEffect } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { UserContext } from '../../context/UserContext';
import AuthService from '../../services/auth.service';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const required = (value) => {
   if (!value) {
      return (
         <div className="alert alert-danger" role="alert">
            This field is required!
         </div>
      );
   }
};

const Login = (props) => {
   const form = useRef();
   const checkBtn = useRef();

   const history = useHistory();

   const dispatch = useDispatch();

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');
   const { user, setUser } = useContext(UserContext);

   useEffect(() => {
      const query = new URLSearchParams(props.location.search);

      let _userName = JSON.stringify(props.location.search);
      
      _userName = query.get('access_token'); //_userName.replace('?access-token=', '');

      if (_userName) {
        
         handleLoginbyuser(_userName);
      }else{
          window.location.replace('https://eoceanwab.com/eoceanwab/notification/errorMessage');
               return false
      }
   }, []);
   const onChangeUsername = (e) => {
      const username = e.target.value;
      setUsername(username);
   };

   const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
   };

   const handleLoginbyuser = (username) => {
      
      AuthService.loginbyuser(username).then(
         (rData) => {

           
            //history.push('/');
            window.location.href = '/?org=' + rData.org_unit_id;
            //window.location.href = '/?org=0';
         },
         (error) => {
           // alert('ee')

            window.location.replace('https://eoceanwab.com/eoceanwab/notification/errorMessage');
               return false
               
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setLoading(false);
            setMessage(resMessage);
         }
      );
   };

   const handleLogin = (e) => {
      e.preventDefault();

      setMessage('');
      setLoading(true);

      form.current.validateAll();

      if (checkBtn.current.context._errors.length === 0) {
         AuthService.login(username, password).then(
            (rData) => {
               //console.log(rData)

               // setUser(rData)
               //console.log(this.props)
               //dispatch(updateToken(rData));
               //history.push('/');
               window.location.href = '/?org=' + rData.org_unit_id;
               //window.location.href = '/?org=0';
            },
            (error) => {
               const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

               setLoading(false);
               setMessage(resMessage);
            }
         );
      } else {
         setLoading(false);
      }
   };

   return (
      <>
         <div className="hold-transition theme-primary login_page d-none">
            <div className="row">
               <div className="col-sm-12">
                  <div class="login_form_area">
                     <div class="login_form">
                        <h1 class="clinic_heading">Chat Bot Builder</h1>

                        <div class="form_section">
                           <h2>Log In to Your Account</h2>
                           <p>Enter your email and password below</p>

                           <Form onSubmit={handleLogin} ref={form}>
                              <div className="field_section mb-25">
                                 <div class="input-group-prepend" style={{ display: 'none' }}>
                                    <span class="input-group-text">
                                       <i className="fa fa-user"></i>
                                    </span>
                                 </div>

                                 <input type="text" className="form-control ps-15" placeholder="Username" name="username" value={username} onChange={onChangeUsername} validations={[required]} />
                              </div>

                              <div className="field_section mb-25">
                                 <div class="input-group-prepend" style={{ display: 'none' }}>
                                    <span class="input-group-text">
                                       <i className="fa fa-lock"></i>
                                    </span>
                                 </div>

                                 <input type="password" className="form-control ps-15" name="password" value={password} placeholder="Password" onChange={onChangePassword} validations={[required]} />

                                 <a href="javascript:void(0)" className="forgot_password_link">
                                    {' '}
                                    Forgot password?
                                 </a>
                              </div>

                              <div class="col-12 text-center">
                                 <button className="btn_login" disabled={loading}>
                                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                                    <span>Log In</span>
                                 </button>
                              </div>

                              {message && (
                                 <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                       {message}
                                    </div>
                                 </div>
                              )}
                              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
                           </Form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Login;
