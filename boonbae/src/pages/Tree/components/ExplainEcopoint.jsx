import React from 'react';
import Tree_EcoPoint from '../../../assets/TreepageImg/Tree_EcoPoint.png';
import '../../../styles/ExplainEcopoint.css'

const ExplainEcopoint = () => {
  return (
    <div className='explain-ecopoint'>
      <div className='explain-ecopoint-title'>
        <img src={Tree_EcoPoint} alt='tier_img'></img>
        <span>에코 포인트란?</span>
      </div>
      <div className='explain-ecopoint-content'>
        <div>
          <p>환경을 보호하기 위한 포인트에요.</p>
          <p>분리배출 인증을 하며 나무를 키우다 보면 쌓여요.</p>
        </div>
        <div>
          <p>1 pt는 100원 정도의 가치가 있으며</p>
          <p>사용 시 일부 금액은 친환경 캠페인에 기부되어요.</p>
        </div>
        <div>
          <p>비록 작은 손길이라도 좋아요.</p>
          <p>그조차도 우리에겐 환경에겐 소중하니깐요.</p>
        </div>
      </div>
    </div>
  );
};

export default ExplainEcopoint;