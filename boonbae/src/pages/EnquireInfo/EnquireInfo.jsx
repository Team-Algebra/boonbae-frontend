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

    const fetchData = () => {
        axios({
            method: "get",
            url: `http://15.165.17.64:8080/api/v1/qna/${qnaPk}`
        })
        .then((result)=>{
            setQnaInfo(result.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }

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