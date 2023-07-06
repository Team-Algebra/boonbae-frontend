import React from 'react';
import profile from '../../../assets/분리배출.PNG'
import {useUserStore} from '../../../stores/userStore'

const TreeInfoHeader = ({exp}) => {
  const { user } = useUserStore(); 

  const calculateLevel = (exp) => {
    let level = 1;
    let levelExp = 10;
    let totalExp = 0;
  
    while (exp >= totalExp + levelExp) {
      totalExp += levelExp;
      level++;
      levelExp = level * 10;
    }
    return level;
  };

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