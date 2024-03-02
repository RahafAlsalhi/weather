import React, { useState } from "react";
import './LoginSignup.css';
import user_icon from './user.png';
import email_icon from './email.png';
import pass_icon from './password.png';


const LoginSignup = () =>{

    const [action , setAction]= useState("Sign Up")
    return (
        <div className="container">
<div className="header">
<div className="text"> {action} </div>
<div className="underline"></div>
</div>
<div className="inputs">
{action==="Login"?<div></div>:<div className="input">
    <img src={user_icon}  />
        <input type="text" name="name" placeholder="Name" />
    </div>}
    <div className="input">
    <img src={email_icon}  />
    <input type="email" name="email" placeholder="Email"/>
    </div>
    <div className="input">
    <img src={pass_icon}  />
    <input type="password" name="password"  placeholder="Password" />
    </div>
</div>
<div className="submit-container">
    <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up </div>
    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}> Login </div>
</div>
        </div>
    )
}

export default LoginSignup;