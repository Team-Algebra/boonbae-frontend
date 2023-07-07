import React from 'react';
import { useNavigate } from 'react-router-dom';

const TreeInfoButton = ({label, route}) => {
  const navigate = useNavigate();

  return (
    <button onClick={()=>navigate(`${route}`)}>
      {label}
    </button>
  );
};

export default TreeInfoButton;