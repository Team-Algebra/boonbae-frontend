import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import "../../styles/FundRegist.css"
import MyEditor from "./components/MyEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FundRegist = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState();
    const [target_amount, setTarget_amount] = useState();
    const [supporting_amount, setSupporting_amount] = useState();
    const [firstCategory, setFirstCategory] = useState();
    const [secondCategoryList, setSecondCategoryList] = useState([]);
    const [secondCategory, setSecondCategory] = useState();
    const [secondCategoryPk, setSecondCategoryPk] = useState();
    const [introduction, setIntroduction] = useState();
    const [open_date, setOpen_date] = useState(new Date());
    const [close_date, setClose_date] = useState(new Date());
    const [selectedImage, setSelectedImage] = useState(null);
    const inputRef = useRef(null);

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
        setSecondCategoryPk(selectedPk);
        if (selectedCategory === "") {
            window.alert("2차 카테고리를 선택하세요.");
        } else {
            setSecondCategory(selectedCategory);
            console.log(selectedPk);
        }
    };

    const handleInputChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleIntroductionChange = (content) => {
        setIntroduction(content);
    };

    //

    /**
   * 드래그 오버 이벤트 핸들러
   * @param {Event} event - 드래그 오버 이벤트 객체
   */
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    /**
     * 드롭 이벤트 핸들러
     * @param {Event} event - 드롭 이벤트 객체
     */
    const handleDrop = (event) => {
        event.preventDefault();
        setSelectedImage(event.dataTransfer.files[0]);
    };

    /**
     * 클릭 이벤트 핸들러
     */
    const handleClick = () => {
        inputRef.current.click();
    };

    /**
 * 선택한 이미지의 사전 서명된 URL을 가져옵니다.
 * @returns {Promise<string|null>} 사전 서명된 URL이 반환되며, 오류가 발생할 경우 null을 반환합니다.
*/
    const getPresignedUrl = async () => {
        try {
            const token = localStorage.getItem('token');
            const name = selectedImage.name;
            const response = await axios.post(`${process.env.REACT_APP_PROXY}/s3/presigned`, {
                image_name: name,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return response.data.presigned_url;
            } else {
                console.log('url 가져오기 실패');
                return null;
            }
        } catch (error) {
            console.error('Presinged_Url 가져오기 실패 :', error);
            return null;
        }
    }

    /**
     * S3 서버에 이미지를 업로드합니다.
     * @param {string} presignedUrl - 사전 서명된 URL
     * @returns {Promise<string>} - 업로드된 이미지의 URL
     * @throws {Error} - 업로드 실패 시 에러가 throw됩니다.
    */
    const postImage = async (presignedUrl) => {
        try {
            const response = await axios.put(presignedUrl, selectedImage, {
                headers: {
                    "Content-Type": "image/png",
                }
            });
            return response.config.url.split('?')[0];
        } catch (error) {
            console.error('S3 이미지 업로드 실패:', error);
            throw error;
        }
    };

    /**
     * 서버에 이미지 URL을 제출합니다.
     * @param {string} img_url - 업로드된 이미지의 URL
     * @returns {Promise<void>}
    */
    const postFund = async (img_url) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${process.env.REACT_APP_PROXY}/funding/`, {
                title: title,
                target_amount: target_amount,
                supporting_amount: supporting_amount,
                second_category_pk: secondCategory,
                introduction: introduction,
                open_date: open_date,
                close_date: close_date,
                main_image: img_url,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("등록되었습니다!");
        } catch (error) {
            console.error('서버 이미지 url 제출 실패', error);
            return null;
        }
    }

    /**
     * 등록 버튼 클릭 이벤트 핸들러입니다.
     * @returns {Promise<void>}
    */
    const handleSubmit = async () => {
        if (!selectedImage) {
            alert('이미지를 선택해주세요!');
            return;
        }
        if (!title) {
            alert('펀딩 이름을 입력해주세요!');
        }
        if (!firstCategory) {
            alert('1차 카테고리를 선택해주세요!');
        }
        if (!secondCategory) {
            alert('2차 카테고리를 선택해주세요!');
        }
        if (!introduction) {
            alert('펀딩 소개를 입력해주세요!');
        }
        if (!target_amount) {
            alert('목표 금액을 입력해주세요!');
        }
        if (!supporting_amount) {
            alert('1회 후원 금액을 입력해주세요!');
        }
        if (!close_date) {
            alert('펀딩 기간을 선택해주세요!');
        }
        try {
            const url = await getPresignedUrl();
            if (url) {
                const img_url = await postImage(url);
                if (img_url) {
                    postFund(img_url);
                }
            }
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }
    };

    // 

    return (
        <div className="fund-regist">
            <div className="fund-regist-header">프로젝트 올리기</div>
            <div className="main-image-select">
                {!selectedImage && <span>드래그 혹은 클릭으로 사진을 제출해주세요</span>}
                <div className="imgupload-form-imgzone" onDragOver={handleDragOver} onDrop={handleDrop} onClick={handleClick}>
                    {
                        selectedImage
                            ? <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
                            : <FontAwesomeIcon icon={faImage} size="xl" />
                    }
                </div>
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleInputChange}
                />
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
                    <MyEditor onIntroductionChange={handleIntroductionChange}></MyEditor>
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
                        maxDate={new Date()}
                        minDate={new Date()}
                        selected={open_date}
                        onChange={date => setOpen_date(date)}
                    />
                    ~
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
                <button className="submit-button" onClick={handleSubmit}>게시</button>
                <button className="cancel-button" onClick={() => { navigate('/fund') }}>취소</button>
            </div>
        </div>
    )
}

export default FundRegist;