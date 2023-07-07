import React from 'react';
import profile from '../../../assets/분리배출.PNG'
import {useUserStore} from '../../../stores/userStore'

const TreeInfoHeader = ({exp,calculateLevel}) => {
  const { user } = useUserStore();
  
  return (
    <div className='tree-infoheader'>
      <div className='tree-userprofile'>
        <div id='tree-profileimg'>
          <img src={profile} alt='프로필 이미지'/>
        </div>
        <span>{user.username}님</span>
      </div>
      <div className='tree-treelevel'>
        <span>나무 레벨</span>
        <div id='level'>
          LEVEL.{calculateLevel(exp)}
        </div>
      </div>
    </div>
  );
};

export default TreeInfoHeader;