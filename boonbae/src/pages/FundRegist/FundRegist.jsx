import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/FundRegist.css"

const FundRegist = () => {
    const navigate = useNavigate();

    const [firstCategory, setFirstCategory] = useState();
    const [secondCategoryList, setSecondCategoryList] = useState([]);
    const [closeDate, setCloseDate] = useState(new Date());

    const handleFirstCategory = (event) => {
        const selectedCategory = event.target.value;
        setFirstCategory(selectedCategory);

        if(selectedCategory === "제품") {
            setSecondCategoryList(["화장품", "음식", "전자제품"])
        } else if (selectedCategory === "캠페인") {
            setSecondCategoryList(["봉사활동", "후원"])
        } else {
            setSecondCategoryList([]);
        }
    }

    return(
        <div className="fund-regist">
            <div className="main-image-select"></div>
            <div className="fund-info">
                <div className="fund-info-name">
                    <div className="fund-info-type1">펀딩 이름</div>
                    <input></input>
                </div>
                <div className="fund-info-type">
                    <div className="fund-info-type2">펀딩 종류</div>
                    <div>
                        <select value={firstCategory} onChange={handleFirstCategory}>
                            <option value="">1차 카테고리</option>
                            <option value="제품">제품</option>
                            <option value="캠페인">캠페인</option>
                        </select>
                        <select>
                            <option value="">2차 카테고리</option>
                            {secondCategoryList.map((option) => (
                                <option value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="fund-introduction">
                    <div className="fund-info-type2">펀딩 소개</div>
                    <div></div>
                </div>
                <div className="fund-target-amount">
                    <div className="fund-info-type1">목표 금액</div>
                    <input></input>
                </div>
                <div className="fund-supporting-amount">
                    <div className="fund-info-type1">1회 후원 금액</div>
                    <input></input>
                </div>
                <div className="fund-close-date">
                    <div className="fund-info-type1">펀딩 기간</div>
                    
                </div>
            </div>
            <div className="fund-ment">저희는 친환경 제품만 취급합니다. 심사는 일주일 이내로 완료</div>
            <div className="button">
                <button className="submit-button">게시</button>
                <button className="cancel-button" onClick={()=>{navigate('/fund')}}>취소</button>
            </div>
        </div>
    )   
}

export default FundRegist;