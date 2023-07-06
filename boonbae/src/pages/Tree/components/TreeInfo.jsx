import React from 'react';
import TreeInfoHeader from './TreeInfoHeader';
import TreeInfoDetail from './TreeInfoDetail';
import TreeInfoButton from './TreeInfoButton'

const TreeInfo = ({myTreeInfo}) => {
  return (
    <div className='tree-info'>
      <TreeInfoHeader exp={myTreeInfo.current_exp}/>
      <TreeInfoDetail/>
      <div>
        <TreeInfoButton/>
        <TreeInfoButton/>
      </div>
    </div>
  );
};

export default TreeInfo;