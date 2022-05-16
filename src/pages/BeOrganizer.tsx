import React from 'react';
import DBNav from '../components/navbar/DBNav';

function BeOrganizer() {
	return (
		<div className='beOrganizer'>
			<div className='beOrganizer-navbar'>
				<DBNav />
			</div>
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
									<h1 className='beOrganizer-body-container-info-name-col2-title-text'>
										Name of the organization
									</h1>
								</div>
								<div className='beOrganizer-body-container-info-name-col2-org'>
									<input className='beOrganizer-body-container-info-name-col2-org-in'></input>
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
									<input className='beOrganizer-body-container-info-about-col2-descbox-in'></input>
								</div>
							</div>
						</div>
					</div>
					<div className='beOrganizer-body-container-footer'>
						<button className='beOrganizer-body-container-footer-button'>
							Done
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BeOrganizer;
