import React from 'react';
import SignupForm from './components/SignupForm';
import logo from "../../assets/분리배출.PNG"

const Signup = () => {
  return (
    <div className="signup">
      <img src={logo} alt="로고"/>
      <SignupForm/>
    </div>
  );
};

export default Signup;