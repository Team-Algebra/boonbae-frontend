import { useNavigate } from "react-router-dom"


export const Sidebar = () => {
    const navigate = useNavigate();

    const menuList = [
        { name: '펀딩 관리', path: '/admin/fund' },
        { name: 'Q&A 관리', path: '/admin/qna' },
        { name: '정보 추가', path: '/admin/add' },
        { name: '분리배출 인증', path: '/admin/certification' },
        { name: '댓글 관리', path: '/admin/comment' },
    ]

    return (
        <section className="admin-sidebar">
            <div className="admin-sidebar__logo">
                <img src="/images/logo.png" alt="boonbae" />
            </div>
            <div className="admin-sidebar__menu">
                <ul>
                    {menuList.map((menu, index) => (
                        <li key={index} onClick={() => navigate(menu.path)}>
                            <span>{menu.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}