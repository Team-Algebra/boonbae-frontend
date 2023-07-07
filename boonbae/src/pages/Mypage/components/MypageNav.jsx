import React,{useState} from 'react';
import '../../../styles/MypageNav.css'
import logo from '../../../assets/분리배출.PNG'

const MypageNav = ({userInfo}) => {
  const [selectedTab, setSelectedTab] = useState('');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  return (
    <div className='mypage-nav'>
      <h2>마이페이지</h2>
      <div className='mypage-imgwrapper'>
      <img src={userInfo.user_img ? userInfo.user_img : logo} alt='프로필 이미지' />
      </div>
      <span>{userInfo.username}</span>
      <button>닉네임 수정</button>
      <div className='mypage-nav-page'>
        <span
          className={selectedTab === 'info' ? 'selected' : ''}
          onClick={() => handleTabClick('info')}
        >
          기본 정보
        </span>
        <span
          className={selectedTab === 'funding' ? 'selected' : ''}
          onClick={() => handleTabClick('funding')}
        >
          나의 펀딩
        </span>
      </div>
      <div className='mypage-nav-user'>
        <span>로그아웃</span>
        <span>비밀번호 수정</span>
        <span>회원탈퇴</span>
      </div>
    </div>
  );
};

export default MypageNav;