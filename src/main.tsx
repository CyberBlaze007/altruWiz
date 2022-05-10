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
import Navigator from './components/navigations/Navigator';
import EventDetails from './pages/EventDetails';
import OrgDashboard from './pages/OrgDashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Navigator />
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Signin />}></Route>
				<Route path='/register' element={<Signup />}></Route>
				<Route path='/upload' element={<FileUpload />}></Route>
				<Route path='/dashboard/profile' element={<Dashboard />}></Route>
				<Route path='/dashboard/events' element={<Dashboard />}></Route>
				<Route path='/dashboard/achievements' element={<Dashboard />}></Route>
				<Route path='/dashboard/certificates' element={<Dashboard />}></Route>
				<Route path='/dashboard/badges' element={<Dashboard />}></Route>
				<Route path='/event/details' element={<EventDetails />}></Route>
				<Route path='/organization' element={<OrgDashboard />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
