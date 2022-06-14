//React Router Components
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Local Components
import Landing from './pages/Landing';
import FileUpload from './pages/FileUpload';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navigator from './components/navigations/Navigator';
import Details from './pages/Details';
import OrgDashboard from './pages/OrgDashboard';
import BeOrganizer from './pages/BeOrganizer';
// import EventCreation from './pages/EventCreation';
import Create from './pages/Create';
import ResetPass from './pages/ResetPass';
import Cert from './components/cert/Cert';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import { HashLoader } from 'react-spinners';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

function App() {
	const [user, loading] = useAuthState(auth);
	const [time, setTime] = useState(true);

	useEffect(() => {
		if (loading) {
			setTimeout(() => setTime(false), 3000);
			return;
		}
		window.scrollTo(0, 0);
	}, [user, loading]);

	return (
		<UserContext.Provider value={user}>
			<BrowserRouter>
				return user ? (
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/login' element={<Signin />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/upload' element={<FileUpload />} />
					<Route path='/event/:id' element={<Details />} />
					<Route path='/organizer' element={<OrgDashboard />} />
					<Route path='/organizer/:id' element={<BeOrganizer />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/dashboard/:id' element={<Dashboard />} />
					<Route path='/test' element={<Cert />} />
					<Route path='/create' element={<Create />} />
					<Route path='/resetpassword' element={<ResetPass />} />
				</Routes>
				) : (
				<div className={time ? 'modal display-flex' : 'modal display-none'}>
					<section className='modal-main'>
						<HashLoader size={100} color={'#9013FE'} />
					</section>
				</div>
				);
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
