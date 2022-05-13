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
<<<<<<< Updated upstream
import Navigator from './components/navigations/Navigator';
import Details from './pages/Details';
import OrgDashboard from './pages/OrgDashboard';
=======
import ScrollToTop from './components/navigations/ScrollToTop';
import AddEvent from './components/modals/AddEvent';
>>>>>>> Stashed changes

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Navigator />
			<Routes>
				<Route path='/' element={<Landing />}></Route>
				<Route path='/login' element={<Signin />}></Route>
				<Route path='/register' element={<Signup />}></Route>
				<Route path='/upload' element={<FileUpload />}></Route>
<<<<<<< Updated upstream
				<Route path='/dashboard/profile' element={<Dashboard />}></Route>
				<Route path='/dashboard/events' element={<Dashboard />}></Route>
				<Route path='/dashboard/achievements' element={<Dashboard />}></Route>
				<Route path='/dashboard/certificates' element={<Dashboard />}></Route>
				<Route path='/dashboard/badges' element={<Dashboard />}></Route>
				<Route path='/event/details' element={<Details />}></Route>
				<Route path='/organization' element={<OrgDashboard />}></Route>
=======
				<Route path='/dashboard' element={<Dashboard />}></Route>
				<Route path='/addevent' element={<AddEvent />}></Route>
>>>>>>> Stashed changes
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
