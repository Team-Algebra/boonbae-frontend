import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Navbar = ({ fundSearch, setFundSearch }) => {

    const [categories, setCategories] = useState([]);



    // 펀딩 카테고리 목록 가져오기
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/funding/category`)
            .then(res => {
                setCategories(res.data.first_category?.map(category => {
                    return {
                        pk: category.first_category_pk,
                        name: category.name
                    }
                }))
            });
    }, [])

    // 검색설정에 카테고리 설정
    const setCategory = (e) => {
        let category = e.target.value;
        setFundSearch({
            ...fundSearch,
            category: category
        })
    }

    // 검색설정에 정렬 기준 설정
    const setSort = (e) => {
        let sort = e.target.innerText;
        setFundSearch({
            ...fundSearch,
            sort: sort_base[sort]
        })
    }


    const sort_base = {
        "최신": "RECENT",
        "인기" : "POPULARITY",
        "마감임박" : "IMMINENT"
    }

    return (
        <section className="fund-navbar">

            <select className='fund-navbar-category' onChange={setCategory}>
                <option value="all">카테고리</option>
                <option value="all">전체</option>
                {categories.map(category => {
                    return (
                        <option key={category.pk} value={category.pk}>{category.name}</option>
                    )
                })}
            </select>
            <div className='fund-navbar-sorting'>
                {
                    Object.keys(sort_base).map(key => {
                        return (
                            <div key={key} className={fundSearch.sort === sort_base[key] ? "active" : ""} onClick={setSort}>{key}</div>
                        )
                    })
                }
            </div>
        </section>
    )
}