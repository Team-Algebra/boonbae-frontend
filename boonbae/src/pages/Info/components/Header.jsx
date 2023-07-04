export const Header = () => {
    return (
        <section className="info-header">
                
            <div className="info-header-item">
                <div className="info-header-img-wrapper">
                    <img className="info-header-img" src="https://via.placeholder.com/150" />
                </div>
                <div className="info-header-item-title">
                    <div>상품 이름</div>
                    <div>#상품 태그</div>
                </div>
            </div>
            <div className="info-header-detail">
                <div className="info-header-type">재활용불가능-일반쓰레기</div>
                <div className="info-header-view">조회 : 35</div>
            </div>

        </section>
    )
}