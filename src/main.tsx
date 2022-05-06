import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import './components/components.scss';
import './index.scss';

//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import FileUpload from './pages/FileUpload';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ScrollToTop from './components/navigations/ScrollToTop';
import Navigator from './components/navigations/Navigator';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ScrollToTop />
			<Navigator />
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Signin />}></Route>
				<Route path='/register' element={<Signup />}></Route>
				<Route path='/upload' element={<FileUpload />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
