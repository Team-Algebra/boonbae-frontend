import React from 'react';
import '../../styles/Tonic.css'
import tonic_img from '../../assets/TreepageImg/Tree_Tonic.png'
import Purchasewindow from './components/Purchasewindow';

const Tonic = () => {

  return (
    <div className='tree-tonic'>
      <div className='tree-tonic-title'>영양제 주기</div>
      <div className='tree-tonic-content'>
        <div className='tree-tonic-imgwrapper'>
          <img src={tonic_img} alt="영양제"></img>
        </div>
        <Purchasewindow/>
      </div>
      <p>
        1개당 경험치 30%가 쌓입니다.
        <br/>
        일부 금액은 친환경 캠페인에 기부됩니다.
      </p>
    </div>
  );
};

export default Tonic;