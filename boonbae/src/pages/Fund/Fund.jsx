import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Item } from "./components/Item";
import { Navbar } from "./components/Navbar";

import "../../styles/Fund.css"

const Fund = () => {

    const navigate = useNavigate();

    const [fundList, setFundList] = useState([]);
    const page_size = 9;

    const getFundItem = async () => {
        let query = "";
        query += `?sort=${fundSearch.sort}`;
        query += `&PageNumber=${fundSearch.page-1}`;
        query += `&PageSize=${page_size}`;
        if (fundSearch.keyword !== "") {
            query += `&TitleSearch=${fundSearch.keyword}`;
        }
        if(fundSearch.category !== "all") {
            query += `&FirstCategory=${fundSearch.category}`;
        }

        const response = await axios.get(`${process.env.REACT_APP_PROXY}/funding/${query}`);
        console.log(response);

        let list = response.data.fundingList.content.map((item) => ({
            pk: item.funding_pk,
            image: item.main_img,
            title: item.title,
            firstCategory: item.first_category_name,
            secondCategory: item.second_category_name,
            description: item.description,
            progress: (item.current_amount/item.target_amount).toFixed(1)*100,
            cur_money: item.current_amount,
            dday: item.dday,
        }))
        console.log(list);
        setFundList(list);

    }



    
    

    // 검색어, 카테고리, 정렬 기준 설정
    const [fundSearch, setFundSearch] = useState({
        keyword: "",
        category: "all",
        sort: "RECENT",
        page: 1
    })

    // 검색어 설정
    const setKeyword = (e) => {
        let keyword = e.target.value;
        setFundSearch({
            ...fundSearch,
            keyword: keyword
        })
    }

    const setPage = (e) => {
        let page = e.target.innerText*1;
        setFundSearch({
            ...fundSearch,
            page: page
        })
    }

    // test 코드, 검색어 설정이 바뀔때마다 검색어를 출력
    // 추후 삭제 필요
    useEffect(() => {
        console.log(fundSearch);
        getFundItem();
    }, [fundSearch])

    return (
        <>
            <section className="fund-header">
                <div className="fund-header-sec-1">
                    <div className="fund-header-upload" onClick={()=>navigate(`/fund/regist`)}>프로젝트 올리기</div>
                    <input className="fund-header-input" placeholder="검색어를 입력해주세요!" onKeyUp={setKeyword}/>
                </div>
                <Navbar fundSearch={ fundSearch } setFundSearch={ setFundSearch } />
                <div className="fund-header-count">
                    <span className="fund-count">{ fundList.length }</span>개의 프로젝트가 있습니다.
                </div>
            </section>
            <section className="fund-body">
                {fundList.map((item) => (
                    <Item key={item.pk} fund={item} />
                ))}
            </section>
            <section className="fund-footer">
                <ul>
                    {/* <a href="#"><li>{'<'}</li></a> */}
                    {[...Array(Math.ceil(fundList.length/page_size))].map((n, index) => {
                        return (
                            <div onClick={setPage} key={index} className={fundSearch.page === index+1 ? "is-active" : ""}><li>{index + 1}</li></div>
                        )})
                    }
                    {/* <a href="#"><li>{'>'}</li></a> */}
                </ul>
            </section>  
        </>
        
    )
}

export default Fund;