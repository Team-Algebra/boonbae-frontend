import React, { useState } from 'react'

import Input from './components/Input'
import { Item } from './components/Item'
import { Main } from './components/Main'

import "../../styles/search.css"

const Search = () => {

    const [items, setItem] = useState([]);


    return (
        <div className='search-wrapper'>
            <Input setItem={setItem} />
            {items.length !== 0
                ? <div className='search-result-count-wrapper'>총 <span className='search-result-count'>{items.length}개</span>의 정보를 찾았어요</div>
                : <Main />
            }


            <div className='search-result-wrapper'>
                {items.map((item, index) => <Item key={index} item={item} />)}
            </div>
        </div>
    )
}

export default Search