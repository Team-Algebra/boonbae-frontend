import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "../../styles/FundRegist.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FundRegist = () => {
    const navigate = useNavigate();

    const [presignedUrl, setPresignedUrl] = useState('');
    const [title, setTitle] = useState();
    const [target_amount, setTarget_amount] = useState();
    const [supporting_amount, setSupporting_amount] = useState();
    const [firstCategory, setFirstCategory] = useState();
    const [secondCategoryList, setSecondCategoryList] = useState([]);
    const [secondCategory, setSecondCategory] = useState();
    const [introduction, setIntroduction] = useState();
    const [open_date, setOpen_date] = useState(new Date());
    const [close_date, setClose_date] = useState(new Date());
    const [mainImage, setMainImage] = useState(null);

    const handleFirstCategory = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "") {
            window.alert("1차 카테고리를 선택하세요.");
        } else {
            setFirstCategory(selectedCategory);
        }

        if (selectedCategory === "제품") {
            setSecondCategoryList([
                { name: "화장품", pk: 0 },
                { name: "음식", pk: 1 },
                { name: "전자제품", pk: 2 }
            ]);
        } else if (selectedCategory === "캠페인") {
            setSecondCategoryList([
                { name: "봉사활동", pk: 3 },
                { name: "후원", pk: 4 }
            ]);
        } else {
            setSecondCategoryList([]);
        }
    };

    const handleSecondCategory = (event) => {
        const selectedCategory = event.target.value;
        const selectedPk = secondCategoryList.find(
            (option) => option.name === selectedCategory
        )?.pk;

        if (selectedCategory === "") {
            window.alert("2차 카테고리를 선택하세요.");
        } else {
            setSecondCategory(selectedPk);
            console.log(selectedPk);
        }
    };

    const handleContactWrite = async () => {
        try {
            const presignedResponse = await axios.post(
                `${process.env.REACT_APP_PROXY}/s3/presigned`,
                {
                    imageName: mainImage.name,
                },
                {
                    headers: {
                        Authorization: localStorage.getItem('accessToken'),
                        'Content-Type': 'application/json',
                    },
                }
            );

            const presignedUrl = presignedResponse.data.toString();
            setPresignedUrl(presignedUrl);

            const uploadResponse = await axios.put(
                presignedUrl,
                selectedFile,
                {
                    headers: {
                        'Content-Type': selectedFile.type,
                    },
                }
            );
            console.log('S3 업로드 성공:', uploadResponse.data);

            const settings = {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                },
            };

            const noticeData = {
                title: title,
                supporting_amount: supporting_amount,
                second_category_pk: 1,
                introduction: introduction,
                open_date: open_date,
                close_date: close_date,
                main_image: presignedUrl
            };

            const noticeResponse = await axios.post(
                `${process.env.REACT_APP_PROXY}/funding/`,
                noticeData,
                settings
            );
            console.log(noticeResponse.data);
            alert(noticeResponse.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (e) => {
        setMainImage(e.target.files[0]);
    };

    const handleIntroductionChange = (newContent) => {
        setIntroduction(newContent);
    };

    return (
        <div className="fund-regist">
            <div className="fund-regist-header">프로젝트 올리기</div>
            <div className="main-image-select">
                <input type="file" onChange={handleFileChange}></input>
            </div>
            <div className="fund-info">
                <div className="fund-info-name">
                    <div className="fund-info-type1">펀딩 이름</div>
                    <input
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </div>
                <div className="fund-info-type">
                    <div className="fund-info-type2">펀딩 종류</div>
                    <div>
                        <select value={firstCategory} onChange={handleFirstCategory}>
                            <option value="">1차 카테고리</option>
                            <option value="제품">제품</option>
                            <option value="캠페인">캠페인</option>
                        </select>
                        <select value={secondCategory} onChange={handleSecondCategory}>
                            <option value="">2차 카테고리</option>
                            {secondCategoryList.map((option) => (
                                <option key={option.pk} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="fund-introduction">
                    <div className="fund-info-type2">펀딩 소개</div>

                </div>
                <div className="fund-target-amount">
                    <div className="fund-info-type1">목표 금액</div>
                    <input
                        onChange={(e) => {
                            setTarget_amount(e.target.value);
                        }}
                    />
                </div>
                <div className="fund-supporting-amount">
                    <div className="fund-info-type1">1회 후원 금액</div>
                    <input
                        onChange={(e) => {
                            setSupporting_amount(e.target.value);
                        }}
                    />
                </div>
                <div className="fund-close-date">
                    <div className="fund-info-type1">펀딩 기간</div>
                    <DatePicker
                        className="datePicker"
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        selected={close_date}
                        onChange={date => setClose_date(date)}
                    />
                </div>
            </div>
            <div className="fund-ment">저희는 친환경 제품만 취급합니다. 심사는 일주일 이내로 완료</div>
            <div className="button">
                <button className="submit-button" onClick={handleContactWrite}>게시</button>
                <button className="cancel-button" onClick={() => { navigate('/fund') }}>취소</button>
            </div>
        </div>
    )
}

export default FundRegist;