import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Paging from "./Paging"

const Table = () => {

    const navigate = useNavigate();

    const [selectedFilter, setSelectedFilter] = useState("전체");
    const [qnaArray, setQnaArray] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [selectedFilter, qnaArray])

    const fetchData = () => {
        axios({
            method: "get",
            url: `${process.env.REACT_APP_PROXY}/qna/`
        })
            .then((result) => {
                setQnaArray(result.data.list);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filterData = () => {
        const filteredData =
            selectedFilter === "전체"
                ? qnaArray
                : qnaArray.filter((data) => {
                    if (selectedFilter === "최신순") {
                        return true;
                    } else if (selectedFilter === "답변완료" && data.status === "answered") {
                        return true;
                    } else if (selectedFilter === "정보추가요청" && data.qnaType === "ADD_REQUEST") {
                        return true;
                    } else if (selectedFilter === "정보수정요청" && data.qnaType === "EDIT_REQUEST") {
                        return true;
                    } else if (selectedFilter === "시스템" && data.qnaType === "SYSTEM_REQUEST") {
                        return true;
                    } else if (selectedFilter === "기타" && data.qnaType === "ETC") {
                        return true;
                    }
                    return false;
                });

        if (selectedFilter === "최신순") {
            return filteredData.sort(
                (a, b) => new Date(b.createAt) - new Date(a.createAt)
            );
        }
        return filteredData;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = filterData().slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleFilterChange = (event) => {
        setSelectedFilter(event.target.value);
    };

    return (
        <div className="qna">
            <div className="qna-filter">
                <select value={selectedFilter} onChange={handleFilterChange}>
                    <option value="전체">전체</option>
                    <option value="최신순">최신순</option>
                    <option value="답변완료">답변완료</option>
                    <option value="정보추가요청">정보추가요청</option>
                    <option value="정보수정요청">정보수정요청</option>
                    <option value="시스템">시스템</option>
                    <option value="기타">기타</option>
                </select>
            </div>
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
                            <tr key={data.qnaPk} onClick={() => { navigate(`/admin/qna/info/${data.qnaPk}`) }}>
                                <td className="qnaType">
                                    {data.qnaType === "ADD_REQUEST"
                                        ? "정보추가요청"
                                        : data.qnaType === "EDIT_REQUEST"
                                            ? "정보수정요청"
                                            : data.qnaType === "SYSTEM_REQUEST"
                                                ? "시스템"
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
                qnaArray={currentData}
                handlePageChange={handlePageChange}
            />

        </div>
    )
}

export default Table;