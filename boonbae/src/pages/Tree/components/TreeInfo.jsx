import React from 'react';
import TreeInfoHeader from './TreeInfoHeader';
import TreeInfoDetail from './TreeInfoDetail';
import TreeInfoButton from './TreeInfoButton';
import Tree_Exp from '../../../assets/TreepageImg/Tree_Exp.png';
import Tree_Tier from '../../../assets/TreepageImg/Tree_Tier.png';
import Tree_EcoPoint from '../../../assets/TreepageImg/Tree_EcoPoint.png';
import Tree_Recycle from '../../../assets/TreepageImg/Tree_Recycle.png';

const TreeInfo = ({ myTreeInfo, calculateLevel }) => {
  const treeInfoItems = [
    { img: Tree_Exp, span_name: '나무 경험치', span_value: myTreeInfo.current_exp },
    { img: Tree_Tier, span_name: '사용자 티어', span_value: (myTreeInfo.rank / myTreeInfo.all_cnt) * 100 },
    { img: Tree_EcoPoint, span_name: '에코 포인트', span_value: myTreeInfo.eco_point },
    { img: Tree_Recycle, span_name: '분리배출 횟수', span_value: myTreeInfo.recycle_cnt },
  ];

  return (
    <div className='tree-info'>
      <TreeInfoHeader exp={myTreeInfo.current_exp} calculateLevel={calculateLevel}/>
      {treeInfoItems.map((item, idx) => (
        <TreeInfoDetail key={idx} img={item.img} span_name={item.span_name} span_value={item.span_value} />
      ))}
      <div className='tree-info-button'>
        <TreeInfoButton label={'분리배출 인증'} route = {'/certification'}/>
        <TreeInfoButton label={'영양제 주기'} route = {'/tonic'}/>
      </div>
    </div>
  );
};

export default TreeInfo;
