import './styles/App.css';

import React, {useEffect} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Main, Enquire, EnquireInfo, EnquireRegist, Fund, FundRegist, Info, Search, Tree, Signup, Login, Certification, Tonic } from './pages';
import Navbar from './components/Navbar';
import { useUserStore } from './stores/userStore';
import PrivateRoute from './components/PrivateRoute';

const App = () => {

	const {checkValid} = useUserStore();
	
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      checkValid(token);
    }
  }, []);

	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/enquire" element={<Enquire />} />
					<Route path="/enquire/:qnaPk" element={<EnquireInfo />} />
					<Route path="/enquire/regist" element={<EnquireRegist />} />
					<Route path="/fund" element={<Fund />} />
					<Route path="/fund/regist" element={<FundRegist />} />
					<Route path="/info" element={<Info />} />
					<Route path="/search" element={<Search />} />
					<Route path="/tree" element={<PrivateRoute component={<Tree/>}/>} />
					<Route path="/certification" element={<PrivateRoute component={<Certification/>}/>} />
					<Route path="/tonic" element={<PrivateRoute component={<Tonic/>}/>} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App;
