import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareSquare } from "@fortawesome/free-regular-svg-icons";



export const Body = ({ fund }) => {

    const moneyToString = (money) => {
        // 1000 -> 1,000
        return (money*1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <section className="fund-detail-body">
            <div className="fund-detail-img-wrapper">
                <img src={fund.main_img} alt="펀드 이미지" />
            </div>
            <div className="fund-detail-body-content">
                <div className="fund-detail-money">
                    <div>
                    <span>모인 금액</span>
                    </div>
                    
                    <div className="fund-detail-money-wrapper">
                        <span>
                            <span>{moneyToString(fund.current_amount)}</span>
                            <span> 원</span>
                        </span>
                        <span> { ((fund.current_amount/fund.target_amount)*100).toFixed(2)}%</span>
                    </div>
                    
                </div>
                <div className="fund-detail-dday">
                    <span>남은 시간</span>
                    <span> {fund.dday}일</span>
                </div>
                <div className="fund-detail-many">
                    <span>투자자 수 </span>
                    <span>{Math.round(fund.current_amount/fund.supporting_amount)} 명</span>
                </div>
                <hr />
                <div className="fund-detail-goal">
                    <div>
                        목표금액
                    </div>
                    <div>
                        <span>{fund.target_amount}</span>원
                    </div>
                </div>
                <div className="fund-detail-term">
                    <div>
                        펀딩기간
                    </div>
                    <div>
                        <span>{fund.open_date}</span> ~ <span>{fund.close_date}</span> <span className="fund-detail-dday-date">{fund.dday}일 남음</span>
                    </div>
                </div>
                <div className="fund-detail-purchase">
                    <div>                    
                        결제
                    </div>
                    <div>
                        결제 목표 금액 달성시 <span>{fund.close_date}</span>에 결제
                    </div>
                </div>
                
                <div className="fund-detail-sns">
                    <div className="fund-detail-like"><FontAwesomeIcon icon={faHeart} size="lg" /></div>
                    <div className="fund-detail-share"><FontAwesomeIcon icon={faShareSquare} size="lg" /></div>
                    <div className="fund-detail-donate-btn">프로젝트 후원하기</div>
                </div>
            </div>
        </section>
    )
}