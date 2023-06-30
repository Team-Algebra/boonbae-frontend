import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/search.css"

const Input = () => {
    return (
        <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} size="lg" />
            <input className="search-input" type="text" placeholder="검색어를 입력해주세요!" />
        </div>
    );
}

export default Input;