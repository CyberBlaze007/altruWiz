import React from 'react';
import ReactDOM from 'react-dom/client';

//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import './index.scss';
import Auth from './pages/Auth';
import FileUpload from './pages/FileUpload';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Auth type={true} />}></Route>
				<Route path='/register' element={<Auth type={false} />}></Route>
				<Route path='/upload' element={<FileUpload />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
