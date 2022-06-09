import { orgs } from '../../assets/pseudodata/org-data';
import { events } from '../../assets/pseudodata/events-data';
import { Button, TextField } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckIcon from '@mui/icons-material/Check';
import DBNav from './../components/navbar/DBNav';
import DataService from '../firebase/services';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrgDashboard() {
	const [orgName, setOrgName] = useState('');
	const [orgDesc, setOrgDesc] = useState('');
	const [orgDescEdit, setOrgDescEdit] = useState(true);
	const [eventsCreated, setEventsCreated] = useState([]);
	const [user, loading] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		getCurrentOrg();
	}, [loading]);

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
					{orgDescEdit ? (
						<p className='profile-body-sec2-form-data'>{orgDesc}</p>
					) : null}
					{!orgDescEdit ? (
						<TextField
							variant={orgDescEdit ? 'standard' : 'outlined'}
							color='secondary'
							placeholder='Write something about you...'
							size='small'
							multiline
							rows={5}
							className='profile-body-sec2-form-field'
							value={orgDesc}
							disabled={orgDescEdit}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								setOrgDesc(event.target.value)
							}
							fullWidth
						/>
					) : null}

					<Button
						startIcon={!orgDescEdit ? <CheckIcon /> : <EditOutlinedIcon />}
						onClick={() => setOrgDescEdit(!orgDescEdit)}
					></Button>
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
							{eventsCreated.map((data) => {
								return <div>{data}</div>;
							})}

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
											navigate('/create');
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
