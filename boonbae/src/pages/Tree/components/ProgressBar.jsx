import React from 'react';

const ProgressBar = ({exp, calculateLevel}) => {
  const level = calculateLevel(exp);
  const levelExp = level * 10;
  const progress = (exp % levelExp) / levelExp * 100;

  return (
    <div className='tree-progressbar'>
      <div className='tree-progressbar-status'>
        <div>Level: {level}</div>
        <div>Exp: {exp}</div>
      </div>
      <div className='tree-progressbar-expbar'>
        <div className='tree-progressbar-exp' style={{ width: `${progress}%` }}></div>
      </div>
      <span>{progress.toFixed(2)}% ({exp % levelExp} / {levelExp})</span>
		</div>
  );
};

export default ProgressBar;