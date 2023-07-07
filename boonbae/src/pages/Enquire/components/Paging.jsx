import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";

const Paging = ({ currentPage, pageSize, qnaArray, handlePageChange }) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="qna-table-bottom">
                <div className="pagination-wrapper">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={qnaArray.length}
                        pageRangeDisplayed={5}
                        prevPageText={"<"}
                        nextPageText={">"}
                        onChange={handlePageChange}
                    />
                </div>
                <button className="regist-button" onClick={() => { navigate('/enquire/regist') }}>글 작성</button>
            </div>
        </>
    )
}

export default Paging;