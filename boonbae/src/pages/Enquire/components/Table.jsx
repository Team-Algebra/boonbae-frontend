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

    const fetchData = () => {
        axios({
          method: "get",
          url: "http://15.165.17.64:8080/api/v1/qna/?size=10&page=1"
        })
        .then((result) => {
            setQnaArray(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
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
                                <td className="qnaType">
                                    {data.qnaType === "add_req"
                                        ? "정보추가 요청"
                                        : data.qnaType === "put_req"
                                        ? "정보수정 요청"
                                        : data.qnaType === "system_req"
                                        ? "시스템 오쳥"
                                        : "기타"
                                    }
                                </td>
                                <td className="status">{data.status == "answerred" ? ("완료") : ("대기")}</td>
                                <td className="title">{data.title}</td>
                                <td className="userName">{data.userName}</td>
                                <td className="createAt">{data.createAt.split("T")[0]}</td>
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