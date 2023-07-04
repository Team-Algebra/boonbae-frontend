import { useState, useEffect } from "react";

const QnaInfo = ( {qnaInfo} ) => {

    const [replyText, setReplyText] = useState(qnaInfo.replyText);

    useEffect(() => {
        if (qnaInfo.isReply === 1) {
          setReplyText(qnaInfo.replyText);
        } else {
          setReplyText(null);
        }
    }, [qnaInfo.isReply, qnaInfo.replyText]);

    return(
        <div className="qna-info">
            <div className="qna-content">
                <div className="qna-property1">제목</div>
                <div className="title-info">{qnaInfo.title}</div>
            </div>
            <div className="qna-content">
                <div className="qna-property1">분류</div>
                <div className={`qnaType-info${qnaInfo.qnaType === "ADD_REQUEST" ? " active" : ""}`}>정보 추가</div>
                <div className={`qnaType-info${qnaInfo.qnaType === "put_req" ? " active" : ""}`}>정보 수정</div>
                <div className={`qnaType-info${qnaInfo.qnaType === "system_req" ? " active" : ""}`}>시스템</div>
                <div className={`qnaType-info${qnaInfo.qnaType === "etc" ? " active" : ""}`}>기타</div>
            </div>
            <div className="qna-content">
                <div className="qna-property1">작성자</div>
                <div className="userName-info">{qnaInfo.userName}</div>
                <div className="qna-property1">작성일</div>
                <div className="createAt-info">{qnaInfo.createAt.split('T')[0]}</div>
            </div>
            <div>
                <div className="qna-property2">내용</div>
                <div className="description-info">{qnaInfo.description}</div>
            </div>
            <div>
                <div className="qna-property2">답변</div>
                <div className="replyText-info">{replyText}</div>
            </div>
        </div>
    )
}

export default QnaInfo;