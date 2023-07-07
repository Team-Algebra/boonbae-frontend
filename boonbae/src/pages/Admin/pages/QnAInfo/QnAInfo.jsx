import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import QnAMoreInfo from "./components/QnAMoreInfo"
import Reply from "./components/Reply"
import "../../../../styles/QnAInfo.css"

const QnAInfo = () => {

    const navigate = useNavigate();
    const { qnaPk } = useParams();
    const [qnaInfo, setQnaInfo] = useState();

    const fetchData = useCallback(() => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_PROXY}/qna/${qnaPk}`
        })
            .then((result) => {
                setQnaInfo(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [qnaPk]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="qna">
            <div className="qna-header">
                <div onClick={() => { navigate(`/admin/qna`) }}>| 정보 Q&A</div>
            </div>
            {qnaInfo && <QnAMoreInfo qnaInfo={qnaInfo}></QnAMoreInfo>}
            <Reply qnaPk={qnaPk} isReply={qnaInfo?.[0]?.isReply}></Reply>
        </div>
    )
}

export default QnAInfo;