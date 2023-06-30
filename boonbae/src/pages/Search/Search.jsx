import React, { useState } from 'react'

import Input from './components/Input'
import { Item } from './components/Item'

import "../../styles/search.css"

const Search = () => {

    const [items, setItem] = useState([1]);

    return (
        <div className='search-wrapper'>
            <Input />
            {items.length !== 0 ? <div className='search-result-count-wrapper'>총 <span className='search-result-count'>{items.length}개</span>의 정보를 찾았어요</div> : null}

            <div className='search-result-wrapper'>
                <Item />
            </div>
        </div>
    )
}

export default Search