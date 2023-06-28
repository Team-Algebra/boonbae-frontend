import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    return (
        <>
            <h1>메인 페이지</h1>
            <ul>
                <li><button onClick={() => navigate("/fund")}>펀딩 페이지로 이동</button></li>            
                <li><button onClick={() => navigate("/info")}>분리배출 정보 페이지로 이동</button></li>
                <li><button onClick={() => navigate("/search")}>분리배출 정보 검색 페이지로 이동</button></li>
                <li><button onClick={() => navigate("/tree")}>나무 페이지로 이동</button></li>
                <li><button onClick={() => navigate("/enquire")}>정보 요청 (Q&A) 페이지로 이동</button></li>
            </ul>
        </>
    )
}

export default Main;