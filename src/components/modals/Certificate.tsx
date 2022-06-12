import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { profiles } from '../../../assets/pseudodata/profile-data';
import Cert from '../cert/Cert';
import { personal_events } from './../../../assets/pseudodata/personal-events';

function ModalCert({ showModal, setShowModal, user }: any) {
	const navigate = useNavigate();
	const { id } = useParams();
	return (
		<div
			className='certificates-modal'
			onClick={() => {
				setShowModal(false), navigate(-1);
			}}>
			<div className='certificates-modal-container'>
				<Cert
					name={
						profiles.at(profiles.findIndex((data) => data.email === user.email))
							.name
					}
					title={personal_events.at(parseInt(id)).title}
					org={personal_events.at(parseInt(id)).org}
					date={personal_events.at(parseInt(id)).date}
				/>
			</div>
		</div>
	);
}

export default ModalCert;
