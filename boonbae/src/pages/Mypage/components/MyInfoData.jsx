import React,{useState} from 'react';
import Modal from './Modal'
import Tree_Tier from '../../../assets/TreepageImg/Tree_Tier.png';
import Tree_EcoPoint from '../../../assets/TreepageImg/Tree_EcoPoint.png';

const MyInfoData = ({userInfo}) => {

  const percentage = (userInfo.rank / userInfo.all_cnt) * 100;
  const calculateTier = (percentage) => {
    if (percentage < 5) {
      return '개화';
    } else if (percentage < 15) {
      return '나무 1';
    } else if (percentage < 25) {
      return '나무 2';
    } else if (percentage < 40) {
      return '나무 3';
    } else if (percentage < 55) {
      return '새싹 1';
    } else if (percentage < 75) {
      return '새싹 2';
    } else if (percentage < 90) {
      return '새싹 3';
    } else {
      return '씨앗';
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // 0: 결제 전, 1: 결제 실패, 2: 결제 성공
  const [chargePointStat, setChargePointStat] = useState(0);

  return (
    <div className='mypage-info-data'>
      <div id='mypage-tier'>
        <div id='mypage-tier-left'>
          <img src={Tree_Tier} alt='img'></img>
          <span>나의 티어</span>
        </div>
        <span>{calculateTier(percentage)}</span>
      </div>
      <div id='mypage-ecopoint'>
        <div id='mypage-ecopoint-left'>
          <img src={Tree_EcoPoint} alt='img'></img>
          <span>에코 포인트</span>
        </div>
        <span>{userInfo.eco_point}pt</span>
      </div>
      <button onClick={openModal}>충전하기</button>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        chargePointStat={chargePointStat}
        setChargePointStat={setChargePointStat}
      />
    </div>
  );
};

export default MyInfoData;