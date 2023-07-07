import { useNavigate } from 'react-router-dom';

export const Item = ({ fund }) => {
    const navigate = useNavigate();

    const moneyToString = (money) => {
        // 1000 -> 1,000
        return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div className="fund-item" onClick={()=>navigate(`/fund/${fund.pk}`)}>
            <div className='fund-item-img-wrapper'>
                <img src={fund.image} alt="펀딩 이미지" />
            </div>
            <div className='fund-item-content'>
                <div className='fund-item-category'>
                    <span>{fund.firstCategory} | {fund.secondCategory}</span>
                </div>
                <div className='fund-item-title'>
                    <span>{fund.title}</span>
                </div>
                <div className='fund-item-description'>
                    <span>{fund.description}</span>
                </div>
                <div className='fund-item-progress'>
                    <div className='fund-item-progress-detail'>
                        <span><span>{fund.progress}% </span><span>{moneyToString(fund.cur_money)}원</span></span>
                        <span>{fund.dday}일 남음</span>
                    </div>
                    <div className='fund-item-progress-bar' style={{width: `${fund.progress > 100 ? 100 : fund.progress  }%`}}></div>
                </div>
            </div>
        </div>
    )
}