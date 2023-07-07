import './styles/App.css';

import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Main, Enquire, EnquireInfo, EnquireRegist, Fund, Info, Search, Tree, Signup, Login, Admin } from './pages';
import Navbar from './components/Navbar';
import { useUserStore } from './stores/userStore';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

	const { checkValid } = useUserStore();
	const [isAdmin, setIsAdmin] = useState(true);
	
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      checkValid(token);
    }
  }, []);

	return (
		<>
			<BrowserRouter>
					{ isAdmin?<Navbar setActive={setIsAdmin} />:null }
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/enquire" element={<Enquire />} />
						<Route path="/enquire/:qnaPk" element={<EnquireInfo />} />
						<Route path="/enquire/regist" element={<EnquireRegist />} />
						<Route path="/fund" element={<Fund />} />
						<Route path="/info/:infoid" element={<Info />} />
						<Route path="/search" element={<Search />} />
						<Route path="/tree" element={<PrivateRoute component={<Tree/>}/>} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/admin/*" element={<Admin />} />
					</Routes>
			</BrowserRouter>
		</>
	)
}

export default App;
