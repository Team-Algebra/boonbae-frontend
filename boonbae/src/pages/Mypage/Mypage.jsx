import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Mypage.css'
import './components/MypageInfo'
import './components/MypageNav'
import MypageInfo from './components/MypageInfo';
import MypageNav from './components/MypageNav';

const Mypage = () => {
  const [userInfo,setUserInfo] = useState({
    username : '',
    id : '',
    eco_point : '',
    user_img : '',
    rank : 1,
    all_cnt : 1
  });

  const getUserInfo = async () =>{
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_PROXY}/users/info/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.status === 200){
        console.log(response.data);
        setUserInfo(response.data);
      }else{
        console.log('사용자 정보를 불러오지 못했습니다.');
      }
      } catch (error) {
        console.error('사용자 정보를 불러오지 못했습니다.',error);
      }
    }

  useEffect(()=>{
    getUserInfo();
    console.log(userInfo);
  },[])

  return (
    <div className='mypage'>
      <MypageNav userInfo = {userInfo}/>
      <MypageInfo userInfo = {userInfo}/>
    </div>
  );
};

export default Mypage;