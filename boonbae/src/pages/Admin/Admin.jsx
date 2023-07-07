
import { Route, Routes } from "react-router-dom"

import { Add, Main, QnA, QnAInfo } from "./pages";
import { Sidebar } from "./components/Sidebar";

import "../../styles/Admin.css"

import QnAMoreInfo from "./pages/QnAInfo/components/QnAMoreInfo";

const Admin = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/qna" element={<QnA />} />
                <Route path="/qna/info/:qnaPk" element={<QnAInfo />} />
                <Route path="/add" element={<Add />} />
            </Routes>
        </>
    )
}

export default Admin;