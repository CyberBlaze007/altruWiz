import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DBNav from './../components/navbar/DBNav';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { auth, firestore } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import DataService from '../firebase/services';

function Organization() {
	const [orgName, setOrgName] = useState('');
	const [orgDesc, setOrgDesc] = useState('');
	const [orgDescEdit, setOrgDescEdit] = useState(true);
	const [eventsCreated, setEventsCreated] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		onSnapshot(
			query(
				collection(firestore, 'organizations'),
				where('creator', '==', user.email)
			),
			(snapshot) => {
				setOrgName(snapshot.docs.at(0).data().orgName);
				setOrgDesc(snapshot.docs.at(0).data().orgAbout);
				setEventsCreated(snapshot.docs.at(0).data().eventsCreated);
			}
		);
	}, [loading]);

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

	return (
		<div className='organizers'>
			<div className='organizers-navbar'>
				<DBNav />
			</div>
			<div className='organizers-body'>
				<div className='organizers-body-info'>
					<div className='organizers-body-info-title'>
						<h1 className='organizers-body-info-title-text'>
							Alt-F4 Organization
						</h1>

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
							<h1 className='organizers-body-info-org-name-t'>
								Org Information
							</h1>
						</div>

						<div className='organizers-body-info-org-description'>
							<h1 className='organizers-body-info-org-description-t'>
								We are always active in closing active applications. We have
								never failed in our mission. Our purpose is to provide
								sustainable and productive user experience for people. We aim to
								solve error crisis and freedom.
							</h1>
						</div>
					</div>
				</div>
				<div className='organizers-body-events'>
					<div className='organizers-body-events-title'>
						<h1 className='organizers-body-events-title-t'>Events</h1>
					</div>
					<div className='organizers-body-events-table'></div>
					<div className='organizers-body-events-create'>
						<h1 className='organizers-body-events-create-text'>
							Create New Event
						</h1>

						<Button
							className='organizers-body-events-create-icon'
							endIcon={<AddOutlinedIcon />}
							onClick={() => {
								setShowModal(true);
							}}></Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Organization;
