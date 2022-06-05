import React, { ChangeEvent, useEffect, useState } from 'react';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import GolfCourseOutlinedIcon from '@mui/icons-material/GolfCourseOutlined';
import TextFieldsOutlinedIcon from '@mui/icons-material/TextFieldsOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import DataService from '../firebase/services';
import { auth, storage } from '../firebase-config';

import Footer from '../components/footer/Footer';
import DBNav from '../components/navbar/DBNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Create() {
	return (
		<div className='create'>
			<div className='create-navbar'>
				<DBNav />
			</div>
			<div className='create-form'>
				<div className='create-form-header'>
					<h1>Make an Event</h1>
					<h2>Let’s cover some basic information about your event.</h2>
				</div>
				<div className='create-form-section1'>
					<div className='create-form-section1-col1'>
						<div className='create-form-section1-col1-entry1'>
							<div className='create-form-section1-col1-entry1-title'>
								<PermContactCalendarOutlinedIcon className='create-form-section1-col2-entry1-title-icon' />
								<h1>Name of Event</h1>
							</div>
							<div className='create-form-section1-col1-entry1-fields'>
								<input type='text' />
							</div>
						</div>
						<div className='create-form-section1-col1-entry2'>
							<div className='create-form-section1-col1-entry2-title'>
								<EventOutlinedIcon className='create-form-section1-col2-entry2-title-icon' />
								<h1>Time {'&'} Date</h1>
							</div>
							<div className='create-form-section1-col1-entry2-fields'>
								<input
									type='date'
									className='create-form-section1-col1-entry2-fields-input1'
								/>
								<input
									type='time'
									className='create-form-section1-col1-entry2-fields-input2'
								/>
							</div>
						</div>
						<div className='create-form-section1-col1-entry3'>
							<div className='create-form-section1-col1-entry3-title'>
								<LocationCityOutlinedIcon className='create-form-section1-col2-entry3-title-icon' />
								<h1>Location</h1>
							</div>
							<div className='create-form-section1-col1-entry3-fields'>
								<input type='search' />
							</div>
						</div>
						<div className='create-form-section1-col1-entry4'>
							<div className='create-form-section1-col1-entry4-title'>
								<GolfCourseOutlinedIcon className='create-form-section1-col1-entry4-title-icon' />
								<h1>Quest</h1>
							</div>
							<div className='create-form-section1-col1-entry4-fields'>
								<input type='text' />
							</div>
						</div>
					</div>
					<div className='create-form-section1-col2'>
						<div className='create-form-section1-col2-entry'>
							<div className='create-form-section1-col2-entry-title'>
								<InsertPhotoOutlinedIcon className='create-form-section1-col2-entry-title-icon' />
								<h1>Event Image</h1>
							</div>
							<div className='create-form-section1-col2-entry-fields'>
								<label
									htmlFor='file'
									className='create-form-section1-col2-entry-fields-input'>
									<div className='create-form-section1-col2-entry-fields-input-container'>
										<AddPhotoAlternateOutlinedIcon className='create-form-section1-col2-entry-fields-input-container-image' />
									</div>
								</label>
								<input
									type='file'
									accept='image/*'
									name='image'
									id='file'
									style={{ display: 'none' }}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='create-form-section2'>
					<div className='create-form-section2-title'>
						<TextFieldsOutlinedIcon className='create-form-section2-title-icon' />
						<h1>Description</h1>
					</div>
					<div className='create-form-section2-field'>
						<div className='create-form-section2-field-text'>
							<p>
								Write your event’s description and convince people to join your
								cause. Add more details to your event like your sponsors,
								purpose, guests, and schedule.
							</p>
						</div>
						<div className='create-form-section2-field-input'>
							<textarea
								className='create-form-section2-field-input-area'
								// rows={5}
								// cols={100}
							/>
						</div>
					</div>
				</div>
				<div className='create-form-section3'>
					<button className='create-form-section3-button'>Done</button>
				</div>
			</div>
			<div className='create-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Create;
