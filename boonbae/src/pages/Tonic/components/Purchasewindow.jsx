import React,{useState} from 'react';
import axios from 'axios';

const Purchasewindow = () => {
  const [count, setCount] = useState(1);

  const handleChange = (event) => {
    const inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 3) {
      setCount(inputValue);
    }
  };

  const purchaseTonic = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_PROXY}/trees/tonic`, {
        amount: count,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        if (response.data.success === true) {
          alert('영양제 구입 성공!');
        } else {
          const reason = response.data.reason;
          if (reason === 'LACK_POINT') {
            alert('포인트가 부족합니다!');
          } else if (reason === 'EXCEED') {
            alert('일일 영양제 구매 횟수를 초과했습니다!');
          }
        }
      } else {
        console.error('영양제 구입 실패 : ',response.status);
      }
    } catch (error) {
      console.error('영양제 구입 실패 : 서버 통신 오류', error);
    }
  };
  
  return (
    <div className='tree-tonic-purchase'>
      <button id='ad'>광고 보기</button>
      <div className="tree-tonic-quantity">
        <span>{`${count * 15} pt`}</span>
        <input 
          type="number" 
          min="1" max="3" 
          value={count}
          onChange={handleChange}
        />
      </div>
      <div className='tree-tonic-button'>
        <button id='left' onClick={purchaseTonic}>구매</button>
        <button id='right'>취소</button>
      </div>
      <p>
        광고는 하루에 1번 시청 가능합니다.
        <br/>
        영양제는 하루에 3번 구매 가능합니다.
      </p>
    </div>
  );
};

export default Purchasewindow;