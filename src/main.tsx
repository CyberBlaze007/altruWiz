import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import FileUpload from './pages/FileUpload';
import Dashboard from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Auth type={true} />}></Route>
				<Route path='/register' element={<Auth type={false} />}></Route>
				<Route path='/upload' element={<FileUpload />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
