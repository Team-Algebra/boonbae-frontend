import { Item } from "./components/Item";

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

    return (
        <>
            <h1>펀딩 페이지입니다.</h1>
            <Item fund={fund} />
        </>
        
    )
}

export default Fund;