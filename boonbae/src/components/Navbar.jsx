import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/분리배출.PNG";
import { useUserStore } from "../stores/userStore";

const Navbar = ({ setActive }) => {
	const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const {user,logout} = useUserStore();

  useEffect(() => {
    setActiveLink(location.pathname);
    console.log(location.pathname.split("/")[1])
    if (location.pathname.split("/")[1] === "admin") setActive(false);
    else setActive(true);
  }, [location]);

  const navLinks = [
    { path: "/search", text: "분리배출검색" },
    { path: "/tree", text: "나무키우기" },
    { path: "/fund", text: "펀딩하기" },
    { path: "/enquire", text: "Q&A" },
    { path: "/admin", text: "관리자"}
  ];
  
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="로고" onClick={()=>{navigate('/')}}/>
        {navLinks.map((link) => (
          <div
            key={link.path}
            className={`${activeLink === link.path ? "navbar-active" : ""}`}
            onClick={() => {
							setActiveLink(link.path)
							navigate(link.path)
						}}
          >
            {link.text}
          </div>
        ))}
      </div>
      <div className="navbar-right">
        {
          user
          ? <button onClick={()=>{logout()}}>로그아웃</button>
          : <button onClick={()=>{navigate('/login')}}>로그인</button>
        }
      </div>
    </div>
  );
};

export default Navbar;