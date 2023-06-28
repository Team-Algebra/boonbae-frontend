import logo from './logo.svg';
import './styles/App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Main, Enquire, Fund, Info, Search, Tree } from './pages';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/enquire" element={<Enquire />} />
					<Route path="/fund" element={<Fund />} />
					<Route path="/info" element={<Info />} />
					<Route path="/search" element={<Search />} />
					<Route path="/tree" element={<Tree />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App;
