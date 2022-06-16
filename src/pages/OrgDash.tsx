import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import DBNav from './../components/navbar/DBNav';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { firestore } from '../firebase-config';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import DataService from '../firebase/services';

import Create from '../components/modals/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Edit from '../components/modals/Edit';
import Delete from '../components/modals/Delete';
import { UserContext } from '../App';
import CreateSuccess from '../components/modals/CreateSuccess';
import Footer from '../components/footer/Footer';

function Organization() {
	const [orgName, setOrgName] = useState('');
	const [orgDesc, setOrgDesc] = useState('');
	const [orgDescEdit, setOrgDescEdit] = useState(true);
	const [eventsCreated, setEventsCreated] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [event, setEvent]: any = useState({});
	const [showModal, setShowModal] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [showModal2, setShowModal2] = useState(false);
	const user = useContext(UserContext);

	useEffect(() => {
		onSnapshot(collection(firestore, 'events'), (snapshot) => {
			setEventList(snapshot.docs.map((docEach) => docEach.data()));
		});
		onSnapshot(query(collection(firestore, 'organizations'), where('creator', '==', user.email)), (snapshot) => {
			setOrgName(snapshot.docs.at(0).data().orgName);
			setOrgDesc(snapshot.docs.at(0).data().orgAbout);
			setEventsCreated(snapshot.docs.at(0).data().eventsCreated);
		});
	}, []);

	const updateDesc = async (orgDescNew: any) => {
		const updatedDesc = {
			orgAbout: orgDescNew,
		};
		try {
			await DataService.updateOrg(updatedDesc, user.uid);
		} catch (error) {
			console.log(error);
		}
	};

	const processDate = (data: any) => {
		const date = new Date(data.eventDate + 'T' + data.eventTime);
		const time = new Date(data.eventDate + 'T' + data.eventTime).toLocaleTimeString('en-US', {
			hour12: true,
			hour: 'numeric',
			minute: 'numeric',
		});
		return date.toDateString() + ' ' + time;
	};

	return (
		<>
			<Create showModal={showModal} setShowModal={setShowModal} />
			<Edit showModal={showModal2} setShowModal={setShowModal2} event={event} />
			<Delete showModal={deleteConfirm} setShowModal={setDeleteConfirm} participants={event.attendCount} event={event} />

			<div className='organizers'>
				<div className='organizers-navbar'>
					<DBNav />
				</div>
				<div className='organizers-body'>
					<div className='organizers-body-info'>
						<div className='organizers-body-info-title'>
							<h1 className='organizers-body-info-title-text'>{orgName}</h1>

							<Button
								className='organizers-body-info-title-icon'
								color='secondary'
								startIcon={!orgDescEdit ? <CheckIcon /> : <EditOutlinedIcon />}
								onClick={() => {
									setOrgDescEdit(!orgDescEdit);
									updateDesc(orgDesc);
								}}></Button>
						</div>
						<div className='organizers-body-info-org'>
							<div className='organizers-body-info-org-name'>
								<h1 className='organizers-body-info-org-name-t'>Org Information</h1>
							</div>

							<div className='organizers-body-info-org-description'>
								{orgDescEdit ? (
									<h1 className='organizers-body-info-org-description-t'>{orgDesc}</h1>
								) : (
									<textarea
										rows={4}
										placeholder='Write something about you...'
										className='organizers-body-info-org-description-edit'
										value={orgDesc}
										disabled={orgDescEdit}
										onChange={(event) => setOrgDesc(event.target.value)}
									/>
								)}
							</div>
						</div>
					</div>
					<div className='organizers-body-events'>
						<div className='organizers-body-events-title'>
							<h1 className='organizers-body-events-title-t'>Events</h1>
						</div>
						<div className='organizers-body-events-table'>
							<table className='organizers-body-events-table-component'>
								<thead>
									<tr>
										<th>Event Code</th>
										<th>Date</th>
										<th>Name</th>
										<th>Participants</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{eventList
										.filter((eventData) => {
											let check = false;
											eventsCreated.forEach((data) => {
												check = check || data === eventData.eventCode;
											});
											return check;
										})
										.map((element) => (
											<tr key={element.eventCode} className='organizers-body-events-table-component-data'>
												<td>{element.eventCode}</td>
												<td>{processDate(element)}</td>
												<td>{element.eventName}</td>
												<td>{element.attendCount}</td>
												<td>
													<div className='organizers-body-events-table-component-data-icons'>
														<EditOutlinedIcon
															className='organizers-body-events-table-component-data-icons-ic'
															onClick={() => {
																setShowModal2(true);
																setEvent(element);
															}}
														/>
													</div>
												</td>
												<td>
													<div
														className='organizers-body-events-table-component-data-icons'
														onClick={() => {
															setEvent(element);
															setDeleteConfirm(true);
														}}>
														<DeleteOutlineIcon className='organizers-body-events-table-component-data-icons-ic' />
													</div>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
						<div className='organizers-body-events-create'>
							<h1 className='organizers-body-events-create-text'>Create New Event</h1>

							<Button
								className='organizers-body-events-create-icon'
								endIcon={<AddOutlinedIcon />}
								onClick={() => {
									setShowModal(true);
								}}></Button>
						</div>
					</div>
				</div>
				<div className='organizers-footer'>
					<Footer />
				</div>
			</div>
		</>
	);
}

export default Organization;
