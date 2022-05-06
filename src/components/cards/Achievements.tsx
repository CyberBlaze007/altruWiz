import React from 'react';
import { achievements } from '../../pseudodata/achievements';
import {
	CircularProgressbarWithChildren,
	buildStyles,
} from 'react-circular-progressbar';

function Achievements() {
	return (
		<div className='achievements'>
			<div className='achievements-body'>
				<div className='achievements-body-row1'>
					<div className='achievements-body-row1-col1'>
						<img src='' className='achievements-body-row1-col1-image' />
						<h1 className='achievements-body-row1-col1-text'>RANK</h1>
					</div>
					<div className='achievements-body-row1-col2'>
						<div className='achievements-body-row1-col2-bar'>
							<CircularProgressbarWithChildren
								styles={buildStyles({
									textSize: '16px',
									pathTransitionDuration: 5,
									pathColor: '#7339AB',
									textColor: '#f88',
									trailColor: 'rgba(117, 57, 172, 0.3)',
									backgroundColor: '#3e98c7',
								})}
								value={
									(achievements.at(0).expGain * 100) / achievements.at(0).expReq
								}
								className='achievements-body-row1-col2-bar-icon'>
								<h1 className='achievements-body-row1-col2-bar-icon-label1'>
									{achievements.at(0).expGain}
								</h1>
								<h1 className='achievements-body-row1-col2-bar-icon-label2'>
									{achievements.at(0).expReq}
								</h1>
							</CircularProgressbarWithChildren>
						</div>
						<h1 className='achievements-body-row1-col2-text'>EXP</h1>
					</div>
					<div className='achievements-body-row1-col3'>
						<div className='achievements-row1-col3-section1'>
							<h1 className='achievements-body-row1-col3-section1-number'>
								{achievements.at(0).joined}
							</h1>
							<h1 className='achievements-body-row1-col3-section1-text'>
								EVENTS JOINED
							</h1>
						</div>
						<div className='achievements-body-row1-col3-section2'>
							<h1 className='achievements-body-row1-col3-section2-number'>
								{achievements.at(0).badges}
							</h1>
							<h1 className='achievements-body-row1-col3-section2-text'>
								BADGES OBTAINED
							</h1>
						</div>
					</div>
				</div>
				<div className='achievements-body-row2'>
					<div className='achievements-body-row2-header'>
						<h1 className='achievements-body-row2-header-label'>Your Events</h1>
					</div>
					<div className='achievements-body-row2-table'>
						<div className='achievements-body-row2-table-head'>
							<div className='achievements-body-row2-table-head-col1'>#</div>
							<div className='achievements-body-row2-table-head-col2'>
								Title
							</div>
							<div className='achievements-body-row2-table-head-col3'>EXP</div>
							<div className='achievements-body-row2-table-head-col4'>
								Date Completed
							</div>
						</div>
						<div className='achievements-body-row2-table-body'>
							{achievements.at(0).events.map((data) => (
								<div
									className='achievements-body-row2-table-body-cells'
									key={data.id}>
									<div className='achievements-body-row2-table-body-cells-col1'>
										{data.id}
									</div>
									<div className='achievements-body-row2-table-body-cells-col2'>
										{data.title}
									</div>
									<div className='achievements-body-row2-table-body-cells-col3'>
										{data.gain}
									</div>
									<div className='achievements-body-row2-table-body-cells-col4'>
										{data.date}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Achievements;
