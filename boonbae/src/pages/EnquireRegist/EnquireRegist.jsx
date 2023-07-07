import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
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
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_PROXY}/qna`, {
                title: title,
                qnaType: qnaType,
                description: description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.alert("등록되었습니다.");
            setTitle("");
            setQnaType("");
            setDescription("");
        } catch (error) {
            window.alert("등록에 실패하였습니다.");
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
                        onClick={() => handleButtonClick('ADD_REQUEST')}
                        className={qnaType === 'ADD_REQUEST' ? 'selected' : ''}
                    >정보추가요청</button>
                    <button
                        onClick={() => handleButtonClick('EDIT_REQUEST')}
                        className={qnaType === 'EDIT_REQUEST' ? 'selected' : ''}
                    >정보수정요청</button>
                    <button
                        onClick={() => handleButtonClick('SYSTEM_REQUEST')}
                        className={qnaType === 'SYSTEM_REQUEST' ? 'selected' : ''}
                    >시스템요청</button>
                    <button
                        onClick={() => handleButtonClick('ETC')}
                        className={qnaType === 'ETC' ? 'selected' : ''}
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
                <button className="submit-button" onClick={canSubmit() ? handleSubmit : null}>게시</button>
                <button className="cancel-button" onClick={() => { navigate('/enquire') }}>취소</button>
            </div>
        </div>
    )
}

export default EnquireRegist;