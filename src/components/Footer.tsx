import React from 'react';

function Footer() {
	return (
		<div className='footer'>
			<div className='footer-row1'>
				<div className='footer-row1-block1'>
					<div className='footer-row1-block1-container'>
						<h1 className='footer-row1-block1-container-text'>AltruWiz</h1>
						<img src='/assets/altruwiz-logo-white.svg' className='footer-row1-block1-container-icon' />
					</div>
				</div>
				<div className='footer-row1-block2'>
					<div className='footer-row1-block2-col1'>
						<div className='footer-row1-block2-col1-head'>
							<h1>Quick Links</h1>
						</div>
						<div className='footer-row1-block2-col1-links'>
							<h1>Home</h1>
							<h1>Dashboard</h1>
							<h1>Events</h1>
							<h1>About Us</h1>
							<h1>FAQs</h1>
						</div>
					</div>
					<div className='footer-row1-block2-col2'>
						<div className='footer-row1-block2-col2-head'>
							<h1>Legal</h1>
						</div>
						<div className='footer-row1-block2-col2-links'>
							<h1>Terms</h1>
							<h1>Privacy</h1>
						</div>
					</div>
					<div className='footer-row1-block2-col3'>
						<div className='footer-row1-block2-col3-head'>
							<h1>Contact Us</h1>
						</div>
						<div className='footer-row1-block2-col3-links'>
							<h1>Facebook</h1>
							<h1>Instagram</h1>
							<h1>Twitter</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='footer-row2'>
				<h1>Copyright © 2022 AltruWiz. All rights reserved.</h1>
			</div>
		</div>
	);
}

export default Footer;
