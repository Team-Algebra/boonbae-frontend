import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Enquire.css"
import Paging from "./Paging"

const Table = () => {

    const navigate = useNavigate();
    
    const [qnaArray, setQnaArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    
    useEffect(() => {
        fetchData();
    }, []);

    // const fetchData = () => {
    //     axios({
    //       method: "get",
    //       url: "http://15.165.17.64:8000/api/v1/qna"
    //     })
    //     .then((result) => {
    //         setQnaArray(result.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // };

    const fetchData = () => {
        const dataArray = Array.from({ length: 128 }, (_, index) => ({
          qnaPk: index + 1,
          qnaType: `정보문의요청`,
          status: `대기`,
          title: `제목 ${index + 1}`,
          userName: `작성자 ${index + 1}`,
          createAt: `2023.06.06`,
        }));
      
        setQnaArray(dataArray);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = qnaArray.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <div className="qna-table">
                <table>
                    <thead>
                        <tr>
                            <th>분류</th>
                            <th>답변 상태</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>    
                        {currentData.map((data) => (
                            <tr key={data.qnaPk} onClick={()=>{navigate(`/enquire/${data.qnaPk}`)}}>
                                <td className="qnaType">{data.qnaType}</td>
                                <td className="status">{data.status}</td>
                                <td className="title">{data.title}</td>
                                <td className="userName">{data.userName}</td>
                                <td className="createAt">{data.createAt}</td>
                            </tr>
                        ))}         
                    </tbody>
                </table>
            </div>
            
            <Paging
                currentPage={currentPage}
                pageSize={pageSize}
                qnaArray={qnaArray}
                handlePageChange={handlePageChange}
            />
            
        </div>
    )
}

export default Table;