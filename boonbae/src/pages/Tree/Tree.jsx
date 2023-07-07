import React, { useEffect, useState }  from 'react';
import axios from 'axios'
import '../../styles/Tree.css'
import TreeInfo from './components/TreeInfo'
import ProgressBar from './components/ProgressBar';
import Flower from '../../assets/TreepageImg/Flower.gif'
import Seed from '../../assets/TreepageImg/Seed.gif'
import Sprout from '../../assets/TreepageImg/Sprout.gif'
import Tree_img from '../../assets/TreepageImg/Tree.gif'

const Tree = () => {
	const [myTreeInfo, setMyTreeInfo] = useState({});
  const [imgTier, setImgTier] = useState('');

  const getTreeInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_PROXY}/trees/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setMyTreeInfo(response.data);
      } else {
        console.log('나의 나무 정보 확인 실패.');
      }
    } catch (error) {
      console.log('토큰 유효성 확인 실패', error);
    }
  };

  const getImageByName = (name) => {
    const treeInfoItems = [
      { img: Flower, name: '개화' },
      { img: Tree_img, name: '나무' },
      { img: Sprout, name: '새싹' },
      { img: Seed, name: '씨앗' },
    ];

    const item = treeInfoItems.find((item) => item.name === name);
    if (item) {
      return item.img;
    } else {
      return null;
    }
  };

  useEffect(() => {
    getTreeInfo();
  }, []);

  useEffect(() => {
    if (myTreeInfo.rank && myTreeInfo.all_cnt) {
      const percentage = (myTreeInfo.rank / myTreeInfo.all_cnt) * 100;
      const tier = calculateTier(percentage);
      const name = getImageByName(tier);
      console.log(percentage, tier, name);
      setImgTier(name);
    }
  }, [myTreeInfo]);

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

  const calculateTier = (percentage) => {
    if (percentage < 5) {
      return '개화';
    } else if (percentage < 40) {
      return '나무';
    } else if (percentage < 90) {
      return '새싹';
    } else {
      return '씨앗';
    }
  };

  return (
    <div className='tree'>
      <div>
        <div className='tree-imgwrapper'>
          <img src={imgTier} alt='나의 나무' />
        </div>
        <ProgressBar exp={myTreeInfo.current_exp} calculateLevel={calculateLevel} />
      </div>
      <TreeInfo myTreeInfo={myTreeInfo} calculateLevel={calculateLevel} />
    </div>
  );
};

export default Tree;