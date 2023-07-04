import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp as likeSolid } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as likeRegular } from "@fortawesome/free-regular-svg-icons"

export const Comment = ({ comment }) => {
    const commentInfo = {
        user: comment.username,
        content: comment.content,
        like: comment.like_cnt,
        likeStatus: comment.like
    }

    return (
        <div className="info-comments-item">
            <div className="info-comments-content-wrapper">
                <div className="info-comments-user">{commentInfo.user}</div>
                <div className="info-comments-content">{commentInfo.content}</div>
            </div>
            <div className="info-comments-etc">
                <div className="info-comments-like">
                    <div className="info-comments-like-icon">
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
