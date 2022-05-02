import React from 'react';
import ReactDOM from 'react-dom/client';

//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import './index.scss';
import Test from './pages/test';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/test-firebase' element={<Test />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
