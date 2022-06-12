import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profiles } from '../../../assets/pseudodata/profile-data';
import Cert from '../cert/Cert';
import { personal_events } from './../../../assets/pseudodata/personal-events';

function ModalCert({ showModal, setShowModal, user, event }: any) {
	const navigate = useNavigate();
	const { id } = useParams();
	return (
		<div
			className='certificates-modal'
			onClick={() => {
				setShowModal(false), navigate(-1);
			}}
		>
			<div className='certificates-modal-container'>
				<Cert
					name={user}
					title={
						event.at(
							event.findIndex((data) => {
								id === data.eventID;
							})
						).eventName
					}
					org={
						event.at(
							event.at(
								event.findIndex((data) => {
									id === data.eventID;
								})
							).eventName
						).eventCreator
					}
					date={
						event.at(
							event.at(
								event.findIndex((data) => {
									console.log('data: ', data);
									console.log('id===eventID: ', id, data.eventID);
									id === data.eventID;
								})
							).eventName
						).eventDate
					}
				/>
			</div>
		</div>
	);
}

export default ModalCert;
