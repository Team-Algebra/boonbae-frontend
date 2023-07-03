import React from 'react';
import LoginForm from './components/LoginForm'
import logo from "../../assets/분리배출.PNG"

const Login = () => {
  return (
    <div className="login">
      <img src={logo} alt="로고"/>
      <LoginForm/>
    </div>
  );
};

export default Login;