import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import axios from "axios"
import QnaInfo from "./components/QnaInfo"
import Reply from "./components/Reply"
import "../../styles/EnquireInfo.css"

const EnquireInfo = () => {

    const {qnaPk} = useParams();
    const [qnaInfo, setQnaInfo] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchData = () => {
    //     axios({
    //         method: "get",
    //         url: `http://15.165.17.64:8000/api/v1/qna/${qnaPk}`
    //     })
    //     .then((result)=>{
    //         setQnaInfo(result.data)
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })
    // }
    
    const fetchData = () => {
        const dummyData = [{
          qnaType: "정보 추가",
          status: "완료",
          isReply: "0",
          replyText: "문의 주셔서 감사합니다! 정보 추가하겠습니다!",
          title: "휴대폰 콘센트는 어떻게 버리나요?",
          userName: "오늘도 출근",
          createAt: "2023.06.06",
          description: "휴대폰 충전기 콘센트 정보가 없어요!",
        }];
      
        setQnaInfo(dummyData);
    };

    return (
        <div className="qna">
            <div className="qna-header">
                <div>| 정보 Q&A</div>
            </div>
            {qnaInfo && <QnaInfo qnaInfo={qnaInfo}></QnaInfo>}
            <Reply qnaPk={qnaPk} isReply={qnaInfo?.[0]?.isReply}></Reply>
        </div>
    )
}

export default EnquireInfo;