import React from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/search.css"

const Input = ({ setItem }) => {
    const search = (e) => {
        // let keyword = e.target.value;

        axios(`${process.env.REACT_APP_PROXY}/recycling/search?q=${e.target.value}`)
            .then(res => {
                console.log(res.data)
                if (res.data.count === 0) return setItem([]);

                let info = res.data?.infoList.map((item, index) => {
                    return {
                        pk: item.pk,
                        name: item.name,
                        type: item.types.length > 0 ? item.types[0] : "기타",
                        tag: item.tags,
                        image: item.imageUrl ? item.imageUrl : "https://via.placeholder.com/150",
                    }
                });

                setItem(info);
            });
    }


    return (
        <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} size="lg" />
            <input className="search-input" type="text" placeholder="검색어를 입력해주세요!" onKeyUp={search} />
        </div>
    );
}

export default Input;