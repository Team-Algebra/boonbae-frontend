import React, { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
    referralID: '',
    isIdAvail: true,
    isUsernameAvail: true,
    isReferralValid: false,
  });

  const regex = {
    id_rule: '*영문자 시작하는 영문자 또는 숫자 6~20자입니다.',
    username_rule: '*영문자로 시작하는 영문자 또는 숫자 5자 이상입니다.',
    password_rule: '*영어,숫자,특수문자 포함 8글자 이상입니다.',
    confirmPassword_rule: '*비밀번호와 일치하지 않습니다.',
    id_reg: /^[a-zA-Z][a-zA-Z0-9]{5,19}$/,
    username_reg: /^[a-z]+[a-z0-9]{4}$/,
    password_reg: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
  * 입력 필드의 값과 유효성 검사 규칙을 기반으로 알림 메시지를 생성합니다.
  * @param {string} name - 폼 필드의 이름입니다.
  * @param {string} rule - 폼 필드와 관련된 유효성 검사 규칙입니다.
  * @returns {React.ReactNode} - 알림 메시지를 나타내는 React 노드입니다. 알림이 필요하지 않은 경우 null을 반환합니다.
  */
  const guideMsg = (name, rule) => {
    if (formData[name] !== '' && !regex[`${name}_reg`].test(formData[name])) {
      return <p>{rule}</p>;
    }
    return null;
  };


  return (
    <form className="signup-form">
      <div>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          value={formData.id}
          onChange={handleChange}
        />
        <button
          className="signup-inputbtn"
          disabled={!regex.id_reg.test(formData.id)}
        >
          중복 확인
        </button>
      </div>
      {guideMsg('id', regex.id_rule)}
      <div>
        <input
          type="text"
          name="username"
          placeholder="닉네임"
          value={formData.username}
          onChange={handleChange}
        />
        <button
          className="signup-inputbtn"
          disabled={!regex.username_reg.test(formData.username)}
        >
          중복 확인
        </button>
      </div>
      {guideMsg('username', regex.username_rule)}
      <div>
        <input
          type="password"
          name="password"
          autoComplete="off"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {guideMsg('password', regex.password_rule)}
      <label htmlFor="signup-confirmpassword">비밀번호 재확인</label>
      <div>
        <input
          type="password"
          name="confirmPassword"
          autoComplete="off"
          placeholder="비밀번호 재확인"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      {
        formData.confirmPassword !== '' 
        && formData.password !== formData.confirmPassword 
        && (<p>{regex.confirmPassword_rule}</p>)
      }
      <label htmlFor="signup-referralID">추천인 아이디</label>
      <div>
        <input
          type="text"
          name="referralID"
          placeholder="추천인 아이디"
          value={formData.referralID}
          onChange={handleChange}
        />
      <button
        className="signup-inputbtn"
        disabled={!regex.id_reg.test(formData.referralID)}
      >
        확인
      </button>
      </div>
      <button className="signup-submit" type="submit">
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
