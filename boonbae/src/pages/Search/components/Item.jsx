import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"


export const Item = ()=> {
    return (
        <div className="item-wrapper"> 
            <div className="item-image-wrapper">
                <img className="item-image" src="https://via.placeholder.com/150" alt="item" />
            </div>
            <div className="item-info-wrapper">
                <div className="item-name">상품명</div>
                <div className="item-type">
                    일반쓰레기
                </div>
                <div className="item-tag">
                    #tag1 #tag2 #tag3
                </div>
            </div>
            <div className="item-link">
                <FontAwesomeIcon icon={faAngleRight} size="2x" className="item-line-item"/>
            </div>
        </div>
    )
}
