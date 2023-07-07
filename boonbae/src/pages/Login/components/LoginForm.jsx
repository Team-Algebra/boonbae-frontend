import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../../../stores/userStore";

const LoginForm = () => {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PROXY}/users/login`,
        {
          id: formData.id,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        const token = response.data.token;
        setUser(response.data.user);
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="login-loginbtn"
          disabled={!(formData.id && formData.password)}
        >
          로그인
        </button>
      </form>
      <button
        type="button"
        className="login-signupbtn"
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </button>
    </>
  );
};

export default LoginForm;
