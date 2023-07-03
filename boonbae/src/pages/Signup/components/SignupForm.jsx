import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from './SignupInputField'

const SignupForm = () => {
  const initialFormData = {
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
    referralID: '',
    isIdDuplicate: true,
    isUsernameDuplicate: true,
    isReferralValid: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSignupDisabled, setIsSignupDisabled] = useState(true);

  const navigate = useNavigate();

  const regex = {
    id_rule: '*영문자 시작하는 영문자 또는 숫자 6~20자입니다.',
    username_rule: '*영문자로 시작하는 영문자 또는 숫자 5자 이상입니다.',
    password_rule: '*영어,숫자,특수문자 포함 8글자 이상입니다.',
    confirmPassword_rule: '*비밀번호와 일치하지 않습니다.',
    id_reg: /^[a-zA-Z][a-zA-Z0-9]{5,19}$/,
    username_reg: /^[a-z]+[a-z0-9]{4}$/,
    password_reg: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/,
  };

  const apiEndpoints = {
    isIdDuplicate: `${process.env.REACT_APP_PROXY}/users/id/${formData.id}/exists`,
    isUsernameDuplicate: `${process.env.REACT_APP_PROXY}/users/username/${formData.username}/exists`,
    isReferralValid: `${process.env.REACT_APP_PROXY}/users/referrers?referrer=${formData.referralID}`,
    signup: `${process.env.REACT_APP_PROXY}/users/`
  };

  /**
  * 입력 필드의 변경 이벤트 핸들러입니다.
  * 폼 데이터를 업데이트하고 상태를 업데이트합니다.
  * @param {Object} e - 변경 이벤트 객체
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      isIdDuplicate: name === 'id' ? true : prevData.isIdDuplicate,
      isUsernameDuplicate: name === 'username' ? true : prevData.isUsernameDuplicate,
      isReferralValid: name === 'referralID' ? false : prevData.isReferralValid,
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

  /**
  * 지정된 필드에 대한 중복 여부를 확인하고 해당 필드 값을 업데이트합니다.
  * @param {string} field - 확인할 필드 이름
  */
  const checkAvailability = async (field) => {
    const endpoint = apiEndpoints[field];
    if (!endpoint) return;
  
    try {
      const response = await axios.get(endpoint);
      const isAvailable = response.data.exists;
  
      if (field === 'isReferralValid') {
        if (isAvailable) {
          setFormData((prevData) => ({
            ...prevData,
            [field]: true,
          }));
          alert('사용이 가능합니다.');
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [field]: false,
            referralID: '',
          }));
          alert('사용이 불가합니다.');
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [field]: isAvailable,
        }));
  
        if (isAvailable) {
          alert('사용이 불가합니다.');
        } else {
          alert('사용이 가능합니다.');
        }
      }
    } catch (error) {
      console.error(`${field} 확인에 실패했습니다.`, error);
    }
  };

  useEffect(() => {
    const isDisabled =
      !formData.isIdDuplicate &&
      !formData.isUsernameDuplicate &&
      formData.password !== '' &&
      regex.password_reg.test(formData.password) &&
      formData.password === formData.confirmPassword;

    setIsSignupDisabled(!isDisabled);
  }, [formData]);

  /**
  * 회원가입을 처리합니다.
  * @param {Object} e - 이벤트 객체
  */
  const handleSignup = async (e) => {
    e.preventDefault();
  
    const endpoint = apiEndpoints.signup;
    if (!endpoint) return;
  
    if (!formData.isReferralValid) {
      setFormData((prevData) => ({
        ...prevData,
        referralID: '',
      }));
    }
  
    try {
      const response = await axios.post(endpoint, {
        id: formData.id,
        username: formData.username,
        password: formData.password,
        referrer_id: formData.isReferralValid ? formData.referralID : '',
      });
  
      if (response.status === 201) {
        alert('회원가입에 성공했습니다!');
        navigate('/login');
      } else if (response.status === 409) {
        alert('이미 존재하는 계정입니다. 다른 아이디를 선택해주세요.');
      } else {
        alert('회원가입에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원가입에 실패했습니다.', error);
    }
  };

  return (
    <form className="signup-form">
      <InputField
        type="text"
        name="id"
        placeholder="아이디"
        value={formData.id}
        onChange={handleChange}
        buttonLabel="중복 확인"
        isButtonDisabled={!regex.id_reg.test(formData.id)}
        onButtonClick={() => checkAvailability('isIdDuplicate')}
      />
      {guideMsg('id', regex.id_rule)}

      <InputField
        type="text"
        name="username"
        placeholder="닉네임"
        value={formData.username}
        onChange={handleChange}
        buttonLabel="중복 확인"
        isButtonDisabled={!regex.username_reg.test(formData.username)}
        onButtonClick={() => checkAvailability('isUsernameDuplicate')}
      />
      {guideMsg('username', regex.username_rule)}

      <InputField
        type="password"
        name="password"
        autoComplete="off"
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
      />
      {guideMsg('password', regex.password_rule)}

      <label htmlFor="signup-confirmpassword">비밀번호 재확인</label>
      <InputField
        type="password"
        name="confirmPassword"
        autoComplete="off"
        placeholder="비밀번호 재확인"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {formData.confirmPassword !== '' && formData.password !== formData.confirmPassword && (
        <p>{regex.confirmPassword_rule}</p>
      )}

      <label htmlFor="signup-referralID">추천인 아이디 (선택)</label>
      <InputField
        type="text"
        name="referralID"
        placeholder="추천인 아이디"
        value={formData.referralID}
        onChange={handleChange}
        buttonLabel="확인"
        isButtonDisabled={!regex.id_reg.test(formData.referralID)}
        onButtonClick={() => checkAvailability('isReferralValid')}
      />

      <button 
        className="signup-submit"
        type='submit'
        disabled={isSignupDisabled}
        onClick={handleSignup}
      >
        회원가입
      </button>
    </form>
  );
};

export default SignupForm;
