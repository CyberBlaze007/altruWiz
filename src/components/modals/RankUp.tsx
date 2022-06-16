import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
function RankUp() {
	return (
		<div className='create-rankup'>
			<div className='create-rankup-container'>
				<div className='create-rankup-container-row1'>
					<CloseIcon className='create-rankup-container-row1-icon' />
				</div>
				<div className='create-rankup-container-row2'>
					<img
						src='../../../../assets/rankup.png'
						className='create-rankup-container-row2-icon'
					/>
					<h1 className='create-rankup-container-row2-text1'>
						Congratulations! You have been promoted to
					</h1>
					<h2 className='create-rankup-container-row2-text2'>
						New Rank Name Here
					</h2>
					<button className='create-rankup-container-row2-button'>
						View Dashboard
					</button>
				</div>
			</div>
		</div>
	);
}

export default RankUp;
