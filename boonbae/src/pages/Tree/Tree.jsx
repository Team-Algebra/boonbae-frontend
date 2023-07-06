import React, { useEffect, useState }  from 'react';
import axios from 'axios'
import '../../styles/Tree.css'
import TreeInfo from './components/TreeInfo'
import ProgressBar from './components/ProgressBar';

const Tree = () => {
	const [myTreeInfo,setMyTreeInfo] = useState([
		{
			all_cnt : 0,
			current_exp : 0,
			is_watching_ad : false,
			rank : 1,
			recycle_cnt : 0,
			tonic_available : 3,
			upload_available : 3,
		}
	]);

	const getTreeInfo = async () =>{
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
      console.log('토큰 유효성 확인 실패',error);
    }
	}

	useEffect(()=>{
		getTreeInfo();
	},[])

	return (
		<div className='tree'>
			<div>
				<div className='tree-imgwrapper'>
					<img alt='나의 나무'/>
				</div>
				<ProgressBar/>
			</div>
			<TreeInfo myTreeInfo={myTreeInfo}/>
		</div>
	)
}

export default Tree;