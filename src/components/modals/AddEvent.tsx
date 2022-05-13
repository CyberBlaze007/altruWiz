import React from 'react';
import DBNav from '../navbar/DBNav';

function AddEvent() {
	return (
		<div className='addevent'>
			<div className='addevent-navbar'>
				<DBNav />
			</div>
			<div className='addevent-body'>
				<div className='addevent-body-container'>
					<div className='addevent-body-container-header'>
						<h1 className='addevent-body-container-header-text1'>
							Make an Event
						</h1>
						<h1 className='addevent-body-container-header-text2'>
							Let’s cover some basic information about your event.
						</h1>
					</div>
					<div className='addevent-body-container-forms'>
						<div className='addevent-body-container-forms-info'>
							<div className='addevent-body-container-forms-info-details'>
								<div className='addevent-body-container-forms-info-details-col1'>
									<div className='addevent-body-container-forms-info-details-col1-name'>
										<div className='addevent-body-container-forms-info-details-col1-name-box1'>
											<img className='addevent-body-container-forms-info-details-col1-name-box1-img'></img>
										</div>
										<div className='addevent-body-container-forms-info-details-col1-name-box2'>
											<div className='addevent-body-container-forms-info-details-col1-name-box2-text'>
												<h1 className='addevent-body-container-forms-info-details-col1-name-box2-text-in'>
													Name of the event
												</h1>
											</div>
											<div className='addevent-body-container-forms-info-details-col1-name-box2-input'>
												<input
													className='addevent-body-container-forms-info-details-col1-name-box2-input-in'
													type='text'></input>
											</div>
										</div>
									</div>
									<div className='addevent-body-container-forms-info-details-col1-datetime'>
										<div className='addevent-body-container-forms-info-details-col1-datetime-box1'>
											<img className='addevent-body-container-forms-info-details-col1-datetime-box1-img'></img>
										</div>
										<div className='addevent-body-container-forms-info-details-col1-datetime-box2'>
											<div className='addevent-body-container-forms-info-details-col1-datetime-box2-text'>
												<h1 className='addevent-body-container-forms-info-details-col1-datetime-box2-text-in'>
													Time and Date
												</h1>
											</div>
											<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input'>
												<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input-date'>
													<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input-date-icon'>
														<img className='addevent-body-container-forms-info-details-col1-datetime-box2-input-date-icon-img'></img>
													</div>
													<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input-date-setdate'>
														<input
															className='addevent-body-container-forms-info-details-col1-datetime-box2-input-date-setdate-in'
															type='date'></input>
													</div>
												</div>
												<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input-time'>
													<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input-time-icon'>
														<img className='addevent-body-container-forms-info-details-col1-datetime-box2-input-time-icon-img'></img>
													</div>
													<div className='addevent-body-container-forms-info-details-col1-datetime-box2-input-time-settime'>
														<input
															className='addevent-body-container-forms-info-details-col1-datetime-box2-input-time-settime-in'
															type='time'></input>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='addevent-body-container-forms-info-details-col1-location'>
										<div className='addevent-body-container-forms-info-details-col1-location-box1'>
											<img className='addevent-body-container-forms-info-details-col1-location-box1-img'></img>
										</div>
										<div className='addevent-body-container-forms-info-details-col1-location-box2'>
											<div className='addevent-body-container-forms-info-details-col1-location-box2-text'>
												<h1 className='addevent-body-container-forms-info-details-col1-location-box2-text-in'>
													Location
												</h1>
											</div>
											<div className='addevent-body-container-forms-info-details-col1-location-box2-input'>
												<div className='addevent-body-container-forms-info-details-col1-location-box2-input-icon'>
													<img className='addevent-body-container-forms-info-details-col1-location-box2-input-icon-img'></img>
												</div>
												<div className='addevent-body-container-forms-info-details-col1-location-box2-input-setlocation'>
													<input
														className='addevent-body-container-forms-info-details-col1-location-box2-input-setlocation-in'
														type='text'></input>
												</div>
											</div>
										</div>
									</div>
									<div className='addevent-body-container-forms-info-details-col1-quest'>
										<div className='addevent-body-container-forms-info-details-col1-quest-box1'>
											<img className='addevent-body-container-forms-info-details-col1-quest-box1-img'></img>
										</div>
										<div className='addevent-body-container-forms-info-details-col1-quest-box2'>
											<div className='addevent-body-container-forms-info-details-col1-quest-box2-text'>
												<h1 className='addevent-body-container-forms-info-details-col1-quest-box2-text-in'>
													Quest
												</h1>
											</div>
											<div className='addevent-body-container-forms-info-details-col1-quest-box2-input'>
												<div className='addevent-body-container-forms-info-details-col1-quest-box2-input-icon'>
													<img className='addevent-body-container-forms-info-details-col1-quest-box2-input-icon-img'></img>
												</div>
												<div className='addevent-body-container-forms-info-details-col1-quest-box2-input-setquest'>
													<input
														className='addevent-body-container-forms-info-details-col1-quest-box2-input-setquest-in'
														type='text'></input>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className='addevent-body-container-forms-info-details-col2'>
									<div className='addevent-body-container-forms-info-details-col2-head'>
										<div className='addevent-body-container-forms-info-details-col2-head-icon'>
											<img className='addevent-body-container-forms-info-details-col2-head-icon-img'></img>
										</div>
										<div className='addevent-body-container-forms-info-details-col2-head-text'>
											<h1 className='addevent-body-container-forms-info-details-col2-head-text-in'>
												Event Image
											</h1>
										</div>
									</div>
									<div className='addevent-body-container-forms-info-details-col2-body'>
										<div className='addevent-body-container-forms-info-details-col2-body-pic'>
											<img className='addevent-body-container-forms-info-details-col2-body-pic-img'></img>
										</div>
										<div className='addevent-body-container-forms-info-details-col2-body-text'>
											<h1 className='addevent-body-container-forms-info-details-col2-body-text-in'>
												Drag and drop or click to add your event image.
											</h1>
										</div>
									</div>
								</div>
							</div>
							<div className='addevent-body-container-forms-info-description'>
								<div className='addevent-body-container-forms-info-description-icon'>
									<img className='addevent-body-container-forms-info-description-icon-img'></img>
								</div>
								<div className='addevent-body-container-forms-info-description-info'>
									<div className='addevent-body-container-forms-info-description-info-text1'>
										<h1 className='addevent-body-container-forms-info-description-info-text1-in'>
											Description
										</h1>
									</div>
									<div className='addevent-body-container-forms-info-description-info-text2'>
										<h1 className='addevent-body-container-forms-info-description-info-text2-in'>
											Write your event’s description and convince people to join
											your cause. Add more details to your event like your
											sponsors, purpose, guests, and schedule.
										</h1>
									</div>
									<div className='addevent-body-container-forms-info-description-info-text3'>
										<input
											className='addevent-body-container-forms-info-description-info-text3-input'
											type='text'></input>
									</div>
								</div>
							</div>
						</div>
						<div className='addevent-body-container-forms-button'>
							<button></button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddEvent;
