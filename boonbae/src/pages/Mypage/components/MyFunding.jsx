import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/MyFunding.css';
import { useNavigate } from 'react-router-dom';

const MyFunding = () => {
  const [fundingList, setFundingList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const getLikesFunding = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_PROXY}/funding/like`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setFundingList(response.data.fundingList);
      } else {
        console.log('펀딩 정보 확인 실패.');
      }
    } catch (error) {
      console.log('토큰 유효성 확인 실패', error);
    }
  };

  useEffect(() => {
    getLikesFunding();
  }, []);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fundingList.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + fundingList.length) % fundingList.length);
  };

  return (
    <div className='myfunding'>
      <div className='carousel'>
        <div className='carousel-container'>
          {fundingList.map((fund, index) => (
            <div
              key={index}
              className={`carousel-inner ${index === currentIndex ? 'actived' : ''}`}
              style={{ display: index === currentIndex ? 'block' : 'none' }}
            >
              <img 
                src={fund.main_img} 
                alt={fund.funding_pk} 
                onClick={()=>navigate(`/fund/${fund.funding_pk}`)}/>
            </div>
          ))}
        </div>
      </div>
      <div className='myfunding-button'>
        <button className='carousel-button' onClick={goToPrevSlide}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>
        <button className='carousel-button' onClick={goToNextSlide}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </div>
    </div>
  );
};

export default MyFunding;
