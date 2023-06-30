import React from "react"
import {useNavigate} from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"


export const Item = ({ item }) => {
    const navigate = useNavigate();


    return (
        <div className="item-wrapper" onClick={()=>navigate("/info")}> 
            <div className="item-image-wrapper">
                <img className="item-image" src={item.image} alt="item" />
            </div>
            <div className="item-info-wrapper">
                <div className="item-name">{item.name}</div>
                <div className="item-type">
                    {item.type}
                </div>
                <div className="item-tag">
                    {item.tag.map(tag => `#${tag} `)}
                </div>
            </div>
            <div className="item-link">
                <FontAwesomeIcon icon={faAngleRight} size="2x" className="item-line-item"/>
            </div>
        </div>
    )
}
