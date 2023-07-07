
import { Route, Routes } from "react-router-dom"

import { Main } from "./pages/Main";
import { Sidebar } from "./components/Sidebar";

import "../../styles/Admin.css"

const Admin = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </>
    )
}

export default Admin;