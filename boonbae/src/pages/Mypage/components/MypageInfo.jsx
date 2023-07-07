import React from 'react';
import '../../../styles/MypageInfo.css'
import MyInfoData from './MyInfoData';
import MyFunding from './MyFunding';

const MypageInfo = ({userInfo}) => {

  return (
    <div className='mypage-info'>
      <span>나의 분리 배출</span>
      <MyInfoData userInfo={userInfo}/>
      <span>좋아요한 펀딩</span>
      <MyFunding/>
    </div>
  );
};

export default MypageInfo;