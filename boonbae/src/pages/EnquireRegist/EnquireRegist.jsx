import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/EnquireRegist.css"

const EnquireRegist = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [qnaType, setQnaType] = useState("");
    const [description, setDescription] = useState("")

    const handleButtonClick = (button) => {
        setQnaType(button);
    };

    const canSubmit = useCallback(() => {
        return title !== "" && qnaType !== "" && description !== "";
    }, [title, qnaType, description]);
    
    const handleSubmit = useCallback(async () => {
        try {
            await axios({
                method:'post',
                url:'http://15.165.17.64:8080/api/v1/qna',
                data: {
                    title : title,
                    qnaType : qnaType,
                    description : description
                }
            })
            window.alert("등록되었습니다.");
            setTitle("");
            setType("");
            setDescription("");
        } catch (error) {
            console.log("에러내용 : ", error);
        } 
      }, [title, qnaType, description])

    return (
        <div className="enquire-regist">
            <div className="enquire-regist-header">
                글 작성
            </div>
            <div className="regist-input">
                <div className="input-type">제목</div>
                <div>
                    <input 
                        onChange={(e) => {
                        setTitle(e.target.value)
                        }}
                        className="title"
                        placeholder="제목을 입력하세요"
                        value={title}
                    />
                </div>
                <div className="input-type">분류</div>
                <div className="qnaType-info">
                    <button 
                        onClick={() => handleButtonClick('add_req')}
                        className={qnaType === 'add_req' ? 'selected' : ''}
                    >정보추가요청</button>
                    <button 
                        onClick={() => handleButtonClick('put_req')}
                        className={qnaType === 'put_req' ? 'selected' : ''}
                    >정보수정요청</button>
                    <button 
                        onClick={() => handleButtonClick('system_req')}
                        className={qnaType === 'system_req' ? 'selected' : ''}
                    >시스템요청</button>
                    <button 
                        onClick={() => handleButtonClick('ect')}
                        className={qnaType === 'ect' ? 'selected' : ''}
                    >기타</button>
                </div>
                <div className="input-type">내용</div>
                <div>
                    <textarea
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        className="description"
                        placeholder="내용을 입력하세요"
                        value={description}
                    />
                </div>
            </div>
            <div className="button">
                <button className="cancel-button" onClick={()=>{navigate('/enquire')}}>취소</button>
                <button className="submit-button" onClick={canSubmit() ? handleSubmit : null}>게시</button>
            </div>
        </div>
    )
}

export default EnquireRegist;