import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import QnaInfo from "./components/QnaInfo"
import "../../styles/EnquireInfo.css"

const EnquireInfo = () => {

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
                <div onClick={() => { navigate(`/enquire`) }}>| 정보 Q&A</div>
            </div>
            {qnaInfo && <QnaInfo qnaInfo={qnaInfo}></QnaInfo>}
        </div>
    )
}

export default EnquireInfo;