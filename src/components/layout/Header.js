import React,{useState,useContext} from "react";
import { Switch, Route, Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Header = ({logOut,currentUser,props}) => {

  


  const [activeClass, setActiveClass] = useState("dashboard");
  const { user, setUser } = useContext(UserContext);
  return (
    <>

  <header className="navbar navbar-expand-lg">
    <div className="header_top">
      <div className="container">
        <div className="row">
          <div className="col-sm-2">
            <div className="navbar-brand logo_section">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
                <ul>
                  
                    <li className={(activeClass === 'dashboard') ? `active` : null}>
                      <i className="border_top"></i>
                      <Link onClick={() => setActiveClass('dashboard')} to={`${props.prefix}/dashboard`}><img className="img-responsive" src="/app/images/header_icon_img.png" /></Link></li>
                 

                  <li>
                    <img className="img-responsive" src="/app/images/header_logo.png" />
                  </li>         
                </ul>
              <div>
                  
                
                
              </div>
                
            </div>            
          </div>

          <div className="col-sm-7">
            <div className="navbar_section collapse navbar-collapse" id="navbarNavDropdown">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <ul className="navbar-nav">

                      {(user.userdata.is_superadmin == 1) ? (
                          <>
                            <li><Link to={`${props.prefix}/customer`}>Customer</Link></li>
                   
                          </>

                          ) : (

                            <>
                              <li><Link to={`${props.prefix}/bot`}>BOT Builder</Link></li>
                            </>

                          )}
                     

                      
                          
                      
                    </ul>

                    
                  </div>

                  
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            <div className="float-end header_user_end_section">
              <div className="header_icon_section">
                <ul>
                  

                 

                 
                      <li><Link className={(activeClass === 'setting') ? `active` : null} onClick={() => setActiveClass('setting')} to={`${props.prefix}/setting`}><i className="fa fa-cog"></i></Link></li>
                  

                
                </ul>
              </div>

              <div className="user_section">
                <div className="user_name_box">
                  <h5 className="user_name"></h5>
                </div>
                <div className="user_img_section dropdown">
                  <a href="#" data-bs-toggle="dropdown" className="dropdown-toggle">
                    <img className="img-responsive rounded-circle" src="/app/images/user_img.png" />
                  </a>

                    <ul className="dropdown-menu login_dropdown text-center">
                      <div className="user_img">
                        <h3 className="user_name_main_text">SK</h3>
                      </div>
                      <h3 className="login_user_name">Dilawar Abbas</h3>
                        <li>
                          <button className="login_dropdown_btn" href="#" onClick={logOut}> Sign Out</button>
                        </li>

                        <li>  
                          <button className="login_dropdown_btn" href="#"> Change Password</button>
                        </li>  
                    </ul>
                  
                </div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </header>
    </>



  );
};

export default Header;
