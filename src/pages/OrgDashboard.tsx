import { orgs } from '../../assets/pseudodata/org-data';
import { events } from '../../assets/pseudodata/events-data';
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DBNav from './../components/navbar/DBNav';
import DataService from '../firebase/Services';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrgDashboard() {
	const [orgName, setOrgName] = useState('');
	const [orgDesc, setOrgDesc] = useState('');
	const [eventsCreated, setEventsCreated] = useState([]);
	const [user] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		getCurrentOrg();
	}, []);

	const getCurrentOrg = async () => {
		await DataService.getOrg(user.uid).then((docSnap) => {
			// console.log(user.uid);
			if (docSnap.exists()) {
				// console.log('Document data:', docSnap.data());
				const myData = docSnap.data();
				setOrgName(myData.orgName);
				setOrgDesc(myData.orgAbout);
				setEventsCreated(myData.eventsCreated);
			} else {
				// doc.data() will be undefined in this case
				console.log('No such document!');
			}
		});
	};

	return (
		<>
			<DBNav />
			<div className='orgDashboard'>
				<div className='orgDashboard-info'>
					<h1>{orgName}</h1>
					<h3>Organization Information</h3>
					<p>{orgDesc}</p>
					<Button startIcon={<EditOutlinedIcon />}></Button>
				</div>
				<div className='orgDashboard-events'>
					<h2>Events</h2>
					<div className='orgDashboard-events-table'>
						<>
							<div className='orgDashboard-events-table-head'>
								<h4>Date</h4>
								<h4>Name</h4>
								<h4>Attendees</h4>
							</div>
							<div>{eventsCreated[0]}</div>
							<div>{eventsCreated[1]}</div>
							<div>{eventsCreated[2]}</div>

							{events.map((element) => {
								<div className='orgDashboard-events-body'>
									<div className='orgDashboard-events-table-body-date'>
										<p>{element.date}</p>
										<p>{element.time}</p>
									</div>
									<div className='orgDashboard-events-table-body-name'>
										<p>{element.title}</p>
									</div>
									<div className='orgDashboard-events-table-body-participants'>
										<p>{element.limit}</p>
									</div>
								</div>;
							})}
							<div className='orgDashboard-events-bodyLast'>
								<div className='orgDashboard-events-table-body-create'>
									<Button
										endIcon={<AddOutlinedIcon />}
										onClick={() => {
											navigate('/event-creation');
										}}
									>
										Create New Event
									</Button>
								</div>
							</div>
						</>
					</div>
				</div>
			</div>
		</>
	);
}

export default OrgDashboard;
