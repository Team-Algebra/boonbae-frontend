import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/search.css"

const Input = ({ setItem }) => {
    const search = (e) => {
        // let keyword = e.target.value;

        setItem([{
            name: "테스트",
            type: "테스트",
            tag: ["테스트", "테스트"],
            image: "https://via.placeholder.com/150",
        }])
    }


    return (
        <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} size="lg" />
            <input className="search-input" type="text" placeholder="검색어를 입력해주세요!" onKeyUp={search} />
        </div>
    );
}

export default Input;