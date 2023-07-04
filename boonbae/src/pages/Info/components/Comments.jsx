import { Comment } from "./Comment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"


const API_URL = process.env.REACT_APP_PROXY;

export const Comments = ({ item_id }) => {

    const [comments, setComments] = useState();



    /**
     * 댓글목록 가져오는 함수
     */
    const getComments = () => {
        // get comments
        // 테스트를 위해 임시로 2번 아이템의 댓글을 가져옴
        fetch(`${API_URL}/recycling/${item_id}/comments`)
            .then(res => res.json())
            .then(data => {
                setComments(constructComments(data.list))
            });
    }


    /**
     * 댓글 목록 생성
     * -> Comment 컴포넌트 생성, Comment 컴포넌트 props 전달 후 안에서 데이터 생성으로 변경 필요
     * @param {*} comment_items 댓글 목록
     * @returns 
     */
    const constructComments = (comment_items) => {
        // construct comments
        return comment_items.map(comment => {
            return <Comment comment={comment} key={comment.comment_pk} />
        })
    }


    useEffect(() => {
        // console.log("1. 댓글 가져오기")
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