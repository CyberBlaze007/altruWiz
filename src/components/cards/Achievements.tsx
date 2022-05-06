import React from 'react';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';

function Achievements() {
	return (
		<div className='achievements'>
			<div className='achievements-row1'>
				<div className='achievements-row1-col1'>
					<img src='' className='achievements-row1-col1-image' />
					<h1 className='achievements-row1-col1-text'>RANK</h1>
				</div>
				<div className='achievements-row1-col2'>
					<div className='achievements-row1-col2-bar'>
						<CircularProgressbarWithChildren
							styles={buildStyles({
								strokeLinecap: 'round',
								textSize: '16px',
								pathTransitionDuration: 5,
								pathColor: '#7339AB',
								textColor: '#f88',
								trailColor: 'white',
								backgroundColor: '#3e98c7',
							})}
							value={66}
							className='achievements-row1-col2-bar-icon'>
							<h1 className='achievements-row1-col2-bar-label1'></h1>
							<h1 className='achievements-row1-col2-bar-label2'></h1>
						</CircularProgressbarWithChildren>
					</div>
					<h1 className='achievements-row1-col2-text'>EXP</h1>
				</div>
				<div className='achievements-row1-col3'></div>
			</div>
			<div className='achievements-row2'>
				<div className='achievements-row2-header'></div>
				<div className='achievements-row2-table'>
					<div className='achievements-row2-table-head'></div>
					<div className='achievements-row2-table-body'>
						<div className='achievements-row2-table-body-cells'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Achievements;
