import React, { useState, useEffect } from "react";

import { Item } from "./components/Item";
import { Navbar } from "./components/Navbar";

import "../../styles/Fund.css"

const Fund = () => {
    const fund = {
        pk: 0,
        image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
        title: "나무를 심어요",
        firstCategory: "환경",
        secondCategory: "나무",
        description: "나무를 심어요",
        progress: 50,
        cur_money: 50000,
        dday: 10,
    }

    const fund_count = 1;

    
    

    // 검색어, 카테고리, 정렬 기준 설정
    const [fundSearch, setFundSearch] = useState({
        keyword: "",
        category: "",
        sort: ""
    })

    // 검색어 설정
    const setKeyword = (e) => {
        let keyword = e.target.value;
        setFundSearch({
            ...fundSearch,
            keyword: keyword
        })
    }

    // test 코드, 검색어 설정이 바뀔때마다 검색어를 출력
    // 추후 삭제 필요
    useEffect(() => {
        console.log(fundSearch);
    }, [fundSearch])

    return (
        <>
            <section className="fund-header">
                <div className="fund-header-sec-1">
                    <div className="fund-header-upload">프로젝트 올리기</div>
                    <input className="fund-header-input" placeholder="검색어를 입력해주세요!" onKeyUp={setKeyword}/>
                </div>
                <Navbar fundSearch={ fundSearch } setFundSearch={ setFundSearch } />
                <div className="fund-header-count">
                    <span className="fund-count">{ fund_count }</span>개의 프로젝트가 있습니다.
                </div>
            </section>
            <section className="fund-body">
                <Item fund={fund} />
            </section>
            <section className="fund-footer">
                <div className="fund-pagination"></div>
            </section>  
        </>
        
    )
}

export default Fund;