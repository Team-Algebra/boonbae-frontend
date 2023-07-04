import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp as likeSolid } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as likeRegular } from "@fortawesome/free-regular-svg-icons"
import { useState, useEffect } from "react"

const API = process.env.REACT_APP_PROXY;

export const Comment = ({ comment }) => {
    const [commentInfo, setItemInfo] = useState({user: "", content: "", like: 0, likeStatus: false})

    useEffect(() => {
        if (comment.username === undefined) return;
        setItemInfo({
            user: comment.username,
            content: comment.content,
            like: comment.like_cnt,
            likeStatus: comment.like,
            id: comment.comment_pk
        });
    }, [comment]);

    const clickLike = (e) => {
        if (commentInfo.user === "") return;
        
        fetch(`${API}/recycling/comment/${commentInfo.id}/like`, {
            method: commentInfo.likeStatus ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recycling_pk: commentInfo.id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.status >= 500) throw new Error({ error: "서버 오류", status: data.status });
                if (data.status >= 400) throw new Error({ error: "클라이언트 오류", status: data.status });
            })
            .catch(err => {
                console.log(err);
                if (err.status >= 500) alert("서버 오류입니다.");
                else alert("로그인이 필요한 서비스입니다.");
            })
    }

    return (
        <div className="info-comments-item">
            <div className="info-comments-content-wrapper">
                <div className="info-comments-user">{commentInfo.user}</div>
                <div className="info-comments-content">{commentInfo.content}</div>
            </div>
            <div className="info-comments-etc">
                <div className="info-comments-like">
                    <div className="info-comments-like-icon" onClick={clickLike}>
                        <FontAwesomeIcon 
                            icon={commentInfo.likeStatus? likeSolid : likeRegular} 
                            size="2x" 
                        />
                    </div>
                    <div className="info-comments-like-count">{commentInfo.like}</div>
                </div>
                <div className="info-comments-report">
                    신고
                </div>
            </div>

        </div>
    )
}
