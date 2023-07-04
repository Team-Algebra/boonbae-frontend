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
                <div className={`qnaType-info${qnaInfo.qnaType === "정보 추가" ? " active" : ""}`}>정보 추가</div>
                <div className={`qnaType-info${qnaInfo.qnaType === "정보 수정" ? " active" : ""}`}>정보 수정</div>
                <div className={`qnaType-info${qnaInfo.qnaType === "정보 문의" ? " active" : ""}`}>정보 문의</div>
            </div>
            <div className="qna-content">
                <div className="qna-property1">작성자</div>
                <div className="userName-info">{qnaInfo.userName}</div>
                <div className="qna-property1">작성일</div>
                <div className="createAt-info">{qnaInfo.createAt}</div>
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