import React, {useEffect, useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

export const Main = () => {
    const [rankItems, setRankItems] = useState([])
    const [honeytip, setHoneytip] = useState("오늘의 꿀팁 예시");

    // get rank items
    useEffect(() => {
        setRankItems(["예시1", "예시2", "예시3", "예시4", "예시5"])
    }, [])

    // get honeytip
    useEffect(() => {
        setHoneytip("오늘의 꿀팁 예시")
    }, [])

    return (
        <div className='search-main-wrapper'>
            <div className='search-rank-wrapper'>
                <div className='search-rank-title'>검색 랭킹 1~5위</div>
                <ol className='search-rank-list'>
                    {rankItems.map((item, index) => <li key={index}>{item}</li>)}
                </ol>
            </div>

            <div className='search-honeytip-wrapper'>
                <div className='search-honeytip-icon-wrapper'>
                    <FontAwesomeIcon icon={faLightbulb} size='2x' className='search-honeytip-icon'/>
                </div>
                <div className='search-honeytip-content-wrapper'>
                    <div className='search-honeytip-title'>{"<오늘의 꿀팁>"}</div>
                    <div className='search-honeytip-content'>{honeytip}</div>
                </div>
                
            </div>

        </div>
    )
}
