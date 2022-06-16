import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CloseIcon from '@mui/icons-material/Close';

function CreateSuccess() {
	return (
		<div className='create-success'>
			<div className='create-success-container'>
				<div className='create-success-container-row1'>
					<CloseIcon className='create-success-container-row1-icon' />
				</div>
				<div className='create-success-container-row2'>
					<img src='/assets/check-circle.svg' className='create-success-container-row2-icon' />
					<h1>You have successfully created an event.</h1>
					<h2>The event code is : 3252352123</h2>
				</div>
				<div className='create-success-container-row3'>
					<button className='create-success-container-row3-button1'>Create Another Event</button>
					<button className='create-success-container-row3-button2'>Copy Event Code</button>
				</div>
			</div>
		</div>
	);
}

export default CreateSuccess;
