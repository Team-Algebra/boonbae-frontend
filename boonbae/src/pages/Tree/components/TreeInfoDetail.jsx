import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faMagnifyingGlassPlus} from "@fortawesome/free-solid-svg-icons"

const TreeInfoDetail = ({img, span_name, span_value}) => {

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

  return (
    <div className='tree-infodetail'>
      <div id='infodetail-left'>
        <img src={img} alt='Tree_icon'></img>
        <span>{span_name}</span>
        {
          ['사용자 티어', '에코 포인트'].includes(span_name) && <FontAwesomeIcon icon={faMagnifyingGlassPlus}/>
        }
      </div>
      <span>{
        span_name === '사용자 티어' ? calculateTier(span_value): span_value
      }</span>
    </div>
  );
};

export default TreeInfoDetail;