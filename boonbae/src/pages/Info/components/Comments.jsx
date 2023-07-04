import { Comment } from "./Comment"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export const Comments = () => {
    return(
        <section className="info-comments">
            <div className="info-comments-header">댓글(15개)</div>
            <div className="info-comments-body">
                <Comment comment={{user:"user", content:"content", like:0}} />
            </div>

            <div className="info-comments-input">
                <input className="info-comments-input-content" placeholder="좋아요 한 개 당 에코 포인트 1pt가 적립됩니다." />
                <button className="info-comments-input-button"><FontAwesomeIcon icon={faPaperPlane} size="2x" /></button>
            </div>
        </section>
    )
}