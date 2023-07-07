import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

export const Main = () => {
    const [rankItems, setRankItems] = useState([])
    const [honeytip, setHoneytip] = useState("오늘의 꿀팁 예시");

    // get rank items
    useEffect(() => {
        axios(`${process.env.REACT_APP_PROXY}/search/ranking`)
            .then(res => {
                console.log(res.data)
                setRankItems(res.data?.rank)
            });
    }, [])

    // get honeytip
    useEffect(() => {
        axios(`${process.env.REACT_APP_PROXY}/tip/`)
            .then(res => {
                console.log(res.data)
                setHoneytip(res.data?.content)
            })
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
