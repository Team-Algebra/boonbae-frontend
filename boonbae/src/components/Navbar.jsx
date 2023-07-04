import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/분리배출.PNG";

const Navbar = () => {
	const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navLinks = [
    { path: "/search", text: "분리배출검색" },
    { path: "/tree", text: "나무키우기" },
    { path: "/fund", text: "펀딩하기" },
    { path: "/enquire", text: "Q&A" },
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
        <button onClick={()=>{navigate('/login')}}>로그인</button>
      </div>
    </div>
  );
};

export default Navbar;