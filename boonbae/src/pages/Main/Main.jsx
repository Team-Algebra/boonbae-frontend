import { useNavigate } from "react-router-dom";
import "../../styles/Main.css"

const Main = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="main-tree">
                <div>나로부터 나에게로!</div>
                <div className="today-tree">오늘의 분리배출 나무</div>
                <div>
                    <div>분리배출은 돌고돌아 나에게로 돌아옵니다.</div>
                    <div>오늘부터라도 세상을 위한 나무를 키워보는 건 어때요?</div>
                </div>
                <div>
                    <img className="tree-image" src="" alt="나무이미지"></img>
                </div>
                <button className="go-tree" onClick={() => navigate("/tree")}>나무 키우기</button>
            </div>
            <div className="main-info">
                <div>
                    <div>나를 위한</div>
                    <div>환경을 위한</div>
                    <div>분리배출 법칙</div>
                </div>
                <div>
                    <div>나로부터 나에게로!</div>
                    <div>정 모를 때는 정보를!</div>
                    <div>같이해서 가치로!</div>
                </div>
                <div>
                    <div>사소하지만 하나씩 해봐요.</div>
                </div>
                <div>
                    <div>ㅂㅂ</div>
                    <div>ㅂㅊ</div>
                </div>
            </div>
        </>
    )
}

export default Main;