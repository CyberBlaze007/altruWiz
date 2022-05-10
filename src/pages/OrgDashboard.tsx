import { orgs } from '../pseudodata/org-data';
import { events } from '../pseudodata/events-data';
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DBNav from './../components/navbar/DBNav';

function OrgDashboard() {
	const data = orgs.at(0);
	return (
		<>
			<DBNav />
			<div className='orgDashboard'>
				<div className='orgDashboard-info'>
					<h1>{data.name}</h1>
					<h3>Organization Information</h3>
					<p>{data.desc}</p>
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
									<Button endIcon={<AddOutlinedIcon />}>
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
