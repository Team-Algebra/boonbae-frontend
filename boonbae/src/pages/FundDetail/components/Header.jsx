export const Header = ({ fund }) => {
    return (
        <section className="fund-detail-header">
            <div className="fund-detail-header__cateogry">
                <span>{fund.first_category_name}</span>
            </div>
            <div className="fund-detail-header__title">
                <span>{fund.title}</span>
            </div>
        </section>
    )

}

