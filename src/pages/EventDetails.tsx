import { events } from '../pseudodata/events-data';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Button } from '@mui/material';
import DBNav from './../components/navbar/DBNav';

function EventDetails() {
	const data = events.at(0);
	return (
		<>
			<DBNav />
			<div className='eventDetails'>
				<div className='eventDetails-header'>
					<div className='eventDetails-header-row1'>
						<div className='eventDetails-header-row1-col1'>
							<img src={`/src/pseudodata/${data.thumbnail}`} alt={data.title} />
						</div>
						<div className='eventDetails-header-row1-col2'>
							<h1>{data.title}</h1>
							<h2>by {data.organizer}</h2>
							<div className='eventDetails-header-row1-col2-exp'>
								<img src='/src/pseudodata/images/star.png' alt='Star Icon' />
								<p>{data.xp}</p>
							</div>
						</div>
					</div>
					<div className='eventDetails-header-row2'>
						<Button
							className='eventDetails-header-row2-share'
							startIcon={<ShareOutlinedIcon />}
						></Button>
						<button className='eventDetails-header-row2-register'>
							Register
						</button>
					</div>
				</div>
				<div className='eventDetails-body'>
					<div className='eventDetails-body-leftCol'>
						<div className='eventDetails-body-leftCol-dateTime'>
							<h3>Date and time</h3>
							<p>{data.date}</p>
							<p>{data.time}</p>
						</div>
						<div className='eventDetails-body-leftCol-location'>
							<h3>Location</h3>
							<p>San Fernando, Cebu</p>
						</div>
						<div className='eventDetails-body-leftCol-quests'>
							<>
								<h3>Quests</h3>
								{data.quests.map((element) => (
									<p key={data.quests.indexOf(element)}>{element}</p>
								))}
							</>
						</div>
						<div className='eventDetails-body-leftCol-badges'>
							<>
								<h3>Available Badges</h3>
								{data.badges.map((element) => (
									<p key={data.badges.indexOf(element)}>{element}</p>
								))}
							</>
						</div>
					</div>
					<div className='eventDetails-body-rightCol'>
						<h1>About this event</h1>
						<div className='eventDetails-body-rightCol-body1'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
								mollitia, blanditiis labore sequi repellendus dignissimos, iusto
								quod sint nostrum non aperiam, atque explicabo suscipit nulla?
								<br /> <br />
							</p>
							<p>
								Eligendi sint numquam error voluptatem non expedita dicta, rerum
								amet, ipsam magni praesentium quasi illum officia et eveniet eum
								quod? Exercitationem, labore. Dolorem, cumque cupiditate!
							</p>

							<h2>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
								reprehenderit.
							</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
								eligendi a asperiores quis, qui iusto deleniti. Facere
								distinctio minus laudantium eius tempora. Ipsum consequuntur
								quod commodi, natus veniam illum iste dicta reiciendis fuga
								repellendus dolor impedit distinctio optio totam facilis libero
								dolorum in ipsa modi, tempore aut. Aliquam, at sapiente. <br />
								<br />
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Laudantium repellat perferendis, nihil dolor illo quod odit
								dolorum reprehenderit recusandae est! Nobis placeat provident
								aperiam, assumenda sed possimus? Illo, maiores! Dicta adipisci
								in voluptatem at facere nisi perspiciatis architecto,
								voluptatibus quasi officia voluptates, quaerat necessitatibus
								accusantium perferendis ea corporis, vel nihil.
							</p>
						</div>
						<div className='eventDetails-body-rightCol-divider'></div>
						<div className='eventDetails-body-rightCol-body2'>
							<h2>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
								reprehenderit.
							</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
								neque blanditiis autem ratione! Autem, sapiente. Suscipit quasi,
								provident odit quidem aperiam molestiae! Ducimus delectus iste
								aut eos minus ipsa provident animi repellat quod, eius dolore
								dolores ullam soluta fugit rerum suscipit laborum labore illo
								aperiam placeat id repudiandae architecto quisquam. <br />
								<br />
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
								esse nobis ipsam? Suscipit mollitia nulla voluptate commodi
								distinctio laudantium, itaque non fuga aspernatur! Officia
								provident eaque non, consequuntur aperiam totam autem alias
								dolores reiciendis voluptate pariatur iure numquam fugit velit
								ipsum, error maiores dolor deserunt. Harum, quis. Perspiciatis,
								voluptatibus quod.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default EventDetails;
