
import { Route, Routes } from "react-router-dom"

import { Add, Main, QnA } from "./pages";
import { Sidebar } from "./components/Sidebar";

import "../../styles/Admin.css"

const Admin = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/qna" element={<QnA />} /> 
                <Route path="/add" element={<Add />} />
            </Routes>
        </>
    )
}

export default Admin;