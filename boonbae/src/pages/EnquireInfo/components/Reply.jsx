import { useState, useCallback } from "react";
import axios from "axios";

const API = process.env.REACT_APP_PROXY;

const Reply = ({ qnaPk, isReply }) => {

    const [reply, setReply] = useState();

    const canSubmit = useCallback(() => {
        return reply !== "" && isReply !== 1;
    }, [reply, isReply]);

    const handleSubmit = useCallback(async () => {
        try {
            await axios({
                method:'post',
                url:`${API}/qna/${qnaPk}/reply`,
                data: {
                    reply: reply,
                }
            })
            window.alert("댓글이 등록되었습니다.");
            setReply("");
        } catch (error) {
            window.alert("등록에 실패하였습니다.");
            console.log("에러내용 : ", error);
        }
    }, [reply, qnaPk])

    return (
        <div className="qna-reply">
            <div className="qna-reply-header">댓글달기</div>
            <div className="qna-reply-input">
                <textarea 
                    onChange={(e)=>{
                        setReply(e.target.value)
                    }}
                    value={reply}
                />
                <button onClick={canSubmit() ? handleSubmit : null}>확인</button>
            </div>
        </div>
    )
}

export default Reply;