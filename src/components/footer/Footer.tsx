import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
	return (
		<div className='footer'>
			<div className='footer-row1'>
				<div className='footer-row1-block1'>
					<div className='footer-row1-block1-container'>
						<h1 className='footer-row1-block1-container-text'>AltruWiz</h1>
						<img
							src='/assets/altruwiz-logo-white.svg'
							className='footer-row1-block1-container-icon'
						/>
					</div>
				</div>
				<div className='footer-row1-block2'>
					<div className='footer-row1-block2-col1'>
						<div className='footer-row1-block2-col1-head'>
							<h1>Quick Links</h1>
						</div>
						<nav className='footer-row1-block2-col1-links'>
							<Link to={'/'} className='footer-row1-block2-col1-links-text'>
								Home
							</Link>
							<Link
								to={'/dashboard'}
								className='footer-row1-block2-col1-links-text'>
								Dashboard
							</Link>
							<Link
								to={'/dashboard'}
								className='footer-row1-block2-col1-links-text'>
								Events
							</Link>
							<Link to={'/'} className='footer-row1-block2-col1-links-text'>
								About Us
							</Link>
							<Link to={'/'} className='footer-row1-block2-col1-links-text'>
								FAQs
							</Link>
						</nav>
					</div>
					<div className='footer-row1-block2-col2'>
						<div className='footer-row1-block2-col2-head'>
							<h1>Legal</h1>
						</div>
						<nav className='footer-row1-block2-col2-links'>
							<Link to={'/'} className='footer-row1-block2-col2-links-text'>
								Terms
							</Link>
							<Link to={'/'} className='footer-row1-block2-col2-links-text'>
								Privacy
							</Link>
						</nav>
					</div>
					<div className='footer-row1-block2-col3'>
						<div className='footer-row1-block2-col3-head'>
							<h1>Contact Us</h1>
						</div>
						<nav className='footer-row1-block2-col3-links'>
							<Link to={''} className='footer-row1-block2-col3-links-text'>
								Facebook
							</Link>
							<Link to={''} className='footer-row1-block2-col3-links-text'>
								Instagram
							</Link>
							<Link to={''} className='footer-row1-block2-col3-links-text'>
								Twitter
							</Link>
						</nav>
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
