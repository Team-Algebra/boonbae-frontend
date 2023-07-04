import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp as likeSolid } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp as likeRegular } from "@fortawesome/free-regular-svg-icons"

export const Comment = ({ comment }) => {
    

    return (
        <div className="info-comments-item">
            <div className="info-comments-content-wrapper">
                <div className="info-comments-user">{comment.user}</div>
                <div className="info-comments-content">{comment.content}</div>
            </div>
            <div className="info-comments-etc">
                <div className="info-comments-like">
                    <div className="info-comments-like-icon"><FontAwesomeIcon icon={likeRegular} size="2x" /></div>
                    <div className="info-comments-like-count">{comment.like}</div>
                </div>
                <div className="info-comments-report">
                    신고
                </div>
            </div>

        </div>
    )
}
