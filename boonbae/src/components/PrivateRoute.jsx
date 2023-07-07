import React, { useEffect,useState } from 'react';
import {Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

/**
 * 프라이빗 라우트 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {React.Component} props.component - 보호된 라우트에 표시할 컴포넌트
 * @returns {React.Component|JSX.Element} - 프라이빗 라우트를 렌더링하는 컴포넌트 또는 로그인 페이지로 이동하는 네비게이션 요소
*/
const PrivateRoute = ({ component: Component}) => {
  const { user, checkValid } = useUserStore();  
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');

  /**
   * 데이터 로딩 상태 확인 및 인증 유효성 검사를 수행합니다.
   */
  const checkLogin = async () =>{
    try {
      await checkValid(token);
    } catch (error) {
      console.log('토큰 유효성 확인 실패', error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * 컴포넌트가 마운트되거나 토큰 또는 유저 상태가 변경될 때마다 로그인 상태를 확인합니다.
   */
  useEffect(() => {
    if (token && !user){
      checkLogin();
    } else{
      setIsLoading(false);
    }
  }, [token, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return user ? Component : <Navigate to='/login'/>;
};

export default PrivateRoute;