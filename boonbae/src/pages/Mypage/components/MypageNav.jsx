import React,{useState} from 'react';
import '../../../styles/MypageNav.css'
import logo from '../../../assets/분리배출.PNG'
import Modal from '../../Tree/components/Modal';
import ModifyInfo from './ModifyInfo';

const MypageNav = ({userInfo}) => {
  const [selectedTab, setSelectedTab] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
      <button onClick={openModal}>프로필 수정</button>
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
        <span>회원탈퇴</span>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <ModifyInfo userInfo={userInfo} logo={logo}/>
      </Modal>
    </div>
  );
};

export default MypageNav;