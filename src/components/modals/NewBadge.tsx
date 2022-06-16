import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

function NewBadge() {
	return (
		<div className='newbadge'>
			<div className='newbadge-container'>
				<div className='newbadge-container-row1'>
					<CloseIcon className='newbadge-container-row1-icon' />
				</div>
				<div className='newbadge-container-row2'>
					<img
						src='/assets/award.png'
						className='newbadge-container-row2-icon'
					/>

					<h1>New Achievement!</h1>
					<h2>
						You have earned the{' '}
						<a href='' className=''>
							Badge Name
						</a>{' '}
						badge.
					</h2>
					<button className='newbadge-container-row2-button'>
						View Badges
					</button>
				</div>
			</div>
		</div>
	);
}

export default NewBadge;
