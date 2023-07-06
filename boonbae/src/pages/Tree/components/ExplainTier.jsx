import React from 'react';
import Tree_Tier from '../../../assets/TreepageImg/Tree_Tier.png';
import Tree_Seed from '../../../assets/TreepageImg/Tree_Seed.png';
import Tree_Sprout from '../../../assets/TreepageImg/Tree_Sprout.png';
import Tree_Tree from '../../../assets/TreepageImg/Tree_Tree.png';
import Tree_Flower from '../../../assets/TreepageImg/Tree_Flower.png';
import '../../../styles/ExplainTier.css';

const ExplainTier = () => {
  const tiers = [
    { image: Tree_Seed, name: '씨앗', range: '상위 90 ~ 100%' },
    { image: Tree_Sprout, name: '새싹 (1~3)', range: '상위 40 ~ 70%' },
    { image: Tree_Tree, name: '나무 (1~3)', range: '상위 5 ~ 40%' },
    { image: Tree_Flower, name: '개화', range: '상위 0 ~ 5%' },
  ];

  return (
    <div className='explain-tier'>
      <div className='explain-tier-title'>
        <img src={Tree_Tier} alt='tier_img'></img>
        <span>사용자 티어</span>
      </div>
      <div className='explain-tier-content'>
        {tiers.map((tier, index) => (
          <div className='explain-tier-content-tier' key={index}>
            <img src={tier.image} alt={tier.name} />
            <span>{tier.name}</span>
            <div>
              <span>상위</span>
              <span>{tier.range}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplainTier;
