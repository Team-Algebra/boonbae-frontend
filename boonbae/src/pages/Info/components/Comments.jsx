import { Comment } from "./Comment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"


const API_URL = process.env.REACT_APP_API_URL;

export const Comments = () => {

    const [comments, setComments] = useState();

    const getComments = () => {
        // get comments
        // 테스트를 위해 임시로 2번 아이템의 댓글을 가져옴
        fetch(`${API_URL}/recycling/2/comments`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setComments(constructComments(data.list))
            });
    }

    const constructComments = (comment_items) => {
        // construct comments
        return comment_items.map(comment => {
            return <Comment
                comment={{
                    user: comment.username,
                    content: comment.content,
                    like: comment.like_cnt
                }}
                key={comment.comment_pk}
            />
        })
    }


    useEffect(() => {
        console.log("1. 댓글 가져오기")
        getComments();
    }, [])


    return(
        <section className="info-comments">
            <div className="info-comments-header">댓글(15개)</div>
            <div className="info-comments-body">
                {comments}
            </div>

            <div className="info-comments-input">
                <input className="info-comments-input-content" placeholder="좋아요 한 개 당 에코 포인트 1pt가 적립됩니다." />
                <button className="info-comments-input-button"><FontAwesomeIcon icon={faPaperPlane} size="2x" /></button>
            </div>
        </section>
    )
}