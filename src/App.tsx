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
import Create from './pages/Create';

function App() {
	return (
		<BrowserRouter>
			<Navigator />
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/login' element={<Signin />} />
				<Route path='/register' element={<Signup />} />
				<Route path='/upload' element={<FileUpload />} />
				<Route path='/event/:id' element={<Details />} />
				<Route path='/organizer' element={<OrgDashboard />} />
				<Route path='/organizer/:id' element={<BeOrganizer />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/addevent' element={<AddEvent />} />
				<Route path='/event-creation' element={<EventCreation />} />
				<Route path='/create' element={<Create />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
