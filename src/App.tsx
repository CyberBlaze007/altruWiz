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
import AddEvent from './components/modals/AddEvent';
import BeOrganizer from './pages/BeOrganizer';
import EventCreation from './pages/EventCreation';

function App() {
	return (
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
				<Route path='/event/details' element={<Details />}></Route>
				<Route path='/makeorg' element={<BeOrganizer />}></Route>
				<Route path='/organization' element={<OrgDashboard />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
				<Route path='/addevent' element={<AddEvent />}></Route>
				<Route path='/beorganizer' element={<BeOrganizer />}></Route>
				<Route path='/event-creation' element={<EventCreation />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
