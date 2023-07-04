import './styles/App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"


import { Main, Enquire, EnquireInfo, EnquireRegist, Fund, Info, Search, Tree, Signup } from './pages';

import Navbar from './components/Navbar';

const App = () => {
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
					<Route path="/info/:infoid" element={<Info />} />
					<Route path="/search" element={<Search />} />
					<Route path="/tree" element={<Tree />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
			
		</>
	)
}

export default App;
