import { ChangeEvent, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import DBNav from '../components/navbar/DBNav';
import { auth } from '../firebase-config';
import ContactsIcon from '@mui/icons-material/Contacts';
import DataService from '../firebase/services';

function BeOrganizer() {
	const [orgName, setOrgName] = useState('');
	const [orgAbout, setOrgAbout] = useState('');
	const [user] = useAuthState(auth);
	const [orgCreator, setCreator] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getCurrentUser();
	}, []);
	const getCurrentUser = async () => {
		await DataService.getUser(user.uid).then((docSnap) => {
			if (docSnap.exists()) {
				const myData = docSnap.data();
				setCreator(myData.email);
			} else {
				console.log('No such document!');
			}
		});
	};

	const makeOrg = async () => {
		const newOrg = {
			orgName: orgName,
			orgAbout: orgAbout,
			creator: orgCreator,
			eventsCreated: [''],
		};
		try {
			await DataService.addOrg(newOrg, user.uid);
		} catch (error) {
			console.log(error);
		}

		setOrgName('');
		setOrgAbout('');
		setCreator('');
		const updatedUser = {
			isOrganizer: true,
		};
		try {
			await DataService.updateUser(updatedUser, user.uid);
		} catch (error) {
			console.log(error);
		}

		navigate('/organizer');
	};

	function handleOnChange(event: ChangeEvent<HTMLTextAreaElement>): void {
		setOrgAbout(event.target.value);
	}

	return (
		<div className='beOrganizer'>
			<DBNav />
			<div className='beOrganizer-body'>
				<div className='beOrganizer-body-container'>
					<div className='beOrganizer-body-container-info'>
						<div className='beOrganizer-body-container-info-header'>
							<h1 className='beOrganizer-body-container-info-header-text1'>
								Be an organizer
							</h1>
							<h1 className='beOrganizer-body-container-info-header-text2'>
								Organization Information
							</h1>
						</div>
						<div className='beOrganizer-body-container-info-name'>
							<div className='beOrganizer-body-container-info-name-col1'></div>
							<div className='beOrganizer-body-container-info-name-col2'>
								<div className='beOrganizer-body-container-info-name-col2-title'>
									<ContactsIcon />
									<h1 className='beOrganizer-body-container-info-name-col2-title-text'>
										Name of the organization
									</h1>
								</div>
								<div className='beOrganizer-body-container-info-name-col2-org'>
									<input
										className='beOrganizer-body-container-info-name-col2-org-in'
										value={orgName}
										onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
											setOrgName(event.target.value)
										}></input>
								</div>
							</div>
						</div>
						<div className='beOrganizer-body-container-info-about'>
							<div className='beOrganizer-body-container-info-about-col1'></div>
							<div className='beOrganizer-body-container-info-about-col2'>
								<div className='beOrganizer-body-container-info-about-col2-title'>
									<h1 className='beOrganizer-body-container-info-about-col2-title-text1'>
										About
									</h1>
									<h1 className='beOrganizer-body-container-info-about-col2-title-text2'>
										Write your organization’s description and add more details
										to your org like your mission, purpose, and objectives.
									</h1>
								</div>
								<div className='beOrganizer-body-container-info-about-col2-descbox'>
									<textarea
										className='beOrganizer-body-container-info-about-col2-descbox-in'
										rows={4}
										cols={50}
										value={orgAbout}
										onChange={(event) => handleOnChange(event)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='beOrganizer-body-container-footer'>
						<button
							className='beOrganizer-body-container-footer-button'
							onClick={makeOrg}>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BeOrganizer;
