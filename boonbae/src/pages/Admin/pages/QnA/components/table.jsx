import axios from "axios";
import { useEffect, useState } from "react";


export const Table = () => {
    const [qnaArray, setQnaArray] = useState([]);

    useEffect(() => {
        setQnaArray([
            {
                id: 1,
                category: "분리배출",
                title: "분리배출에 대한 질문입니다.",
                writer: "홍길동",
                date: "2021-09-01",
                status: "답변완료"
            },
        ])

        // axios.get("http://localhost:8080/qna")

    }, [])


    return (
        <table className="admin-qna-table">
            <thead>
                <tr>
                    <th>번호</th>
                    <th>분류</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                    <th>상태</th>
                </tr>
            </thead>
            <tbody>
                {qnaArray.map((qna, index) => (
                    <tr key={index}>
                        <td>{qna.id}</td>
                        <td>{qna.category}</td>
                        <td>{qna.title}</td>
                        <td>{qna.writer}</td>
                        <td>{qna.date}</td>
                        <td>{qna.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>      
    )
};