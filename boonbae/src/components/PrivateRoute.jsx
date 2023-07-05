import React from 'react';
import {Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

/**
 * 프라이빗 라우트 컴포넌트입니다.
 * @param {Object} props - 컴포넌트 속성
 * @param {React.Component} props.component - 보호된 라우트에 표시할 컴포넌트
 * @returns {React.Component|JSX.Element} - 프라이빗 라우트를 렌더링하는 컴포넌트 또는 로그인 페이지로 이동하는 네비게이션 요소
*/
const PrivateRoute = ({ component: Component}) => {
  const { user } = useUserStore();
  return(
    user ? Component : <Navigate to='/login'/>
  );
};

export default PrivateRoute;