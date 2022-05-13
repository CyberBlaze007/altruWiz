import { events } from '../pseudodata/events-data';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import DBNav from './../components/navbar/DBNav';
import { useNavigate } from 'react-router-dom';

function Details() {
	const data = events.at(0);
	const navigate = useNavigate();
	return (
		<div className='details'>
			<div className='details-nav'>
				<DBNav />
			</div>
			<div className='details-back'>
				<ArrowBackIcon
					className='details-back-icon'
					onClick={() => {
						navigate('/dashboard/events');
					}}
				/>
			</div>
			<div className='details-head'>
				<div className='details-head-row1'>
					<div className='details-head-row1-col1'>
						<img src={`/src/pseudodata/${data.thumbnail}`} alt={data.title} />
					</div>
					<div className='details-head-row1-col2'>
						<h1 className='details-head-row1-col2-title'>{data.title}</h1>
						<h1 className='details-head-row1-col2-org'>by {data.organizer}</h1>
						<div className='details-head-row1-col2-xp'>
							<img src='/src/pseudodata/images/star.png' alt='Star Icon' />
							<p>{data.xp}</p>
						</div>
					</div>
				</div>
				<div className='details-head-row2'>
					<ShareOutlinedIcon className='details-head-row2-icon' />
					<button className='details-head-row2-register'>Register</button>
				</div>
			</div>
			<div className='details-body'>
				<div className='details-body-col1'>
					<div className='details-body-col1-sec1'>
						<h1>Date and time</h1>
						<p>{data.date}</p>
						<p>{data.time}</p>
					</div>
					<div className='details-body-col1-sec2'>
						<h1>Location</h1>
						<p>San Fernando, Cebu</p>
					</div>
					<div className='details-body-col1-sec3'>
						<h1>Quests</h1>
						{data.quests.map((element) => (
							<p key={data.quests.indexOf(element)}>{element}</p>
						))}
					</div>
					<div className='details-body-col1-sec4'>
						<h1>Available Badges</h1>
						{data.badges.map((element) => (
							<p key={data.badges.indexOf(element)}>{element}</p>
						))}
					</div>
				</div>
				<div className='details-body-col2'>
					<div className='details-body-col2-header'>
						<h1>About this event</h1>
					</div>
					<div className='details-body-col2-body'>
						<div className='details-body-col2-body-sec1'>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
								mollitia, blanditiis labore sequi repellendus dignissimos, iusto
								quod sint nostrum non aperiam, atque explicabo suscipit nulla?
							</p>
							<p>
								Eligendi sint numquam error voluptatem non expedita dicta, rerum
								amet, ipsam magni praesentium quasi illum officia et eveniet eum
								quod? Exercitationem, labore. Dolorem, cumque cupiditate!
							</p>
							<h1>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
								reprehenderit.
							</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
								eligendi a asperiores quis, qui iusto deleniti. Facere
								distinctio minus laudantium eius tempora. Ipsum consequuntur
								quod commodi, natus veniam illum iste dicta reiciendis fuga
								repellendus dolor impedit distinctio optio totam facilis libero
								dolorum in ipsa modi, tempore aut.Aliquam, at sapiente.
							</p>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Laudantium repellat perferendis, nihil dolor illo quod odit
								dolorum reprehenderit recusandae est! Nobis placeat provident
								aperiam, assumenda sed possimus? Illo, maiores! Dicta adipisci
								in voluptatem at facere nisi perspiciatis architecto,
								voluptatibus quasi officia voluptates, quaerat necessitatibus
								accusantium perferendis ea corporis, vel nihil.
							</p>
						</div>
						<div className='details-body-col2-body-divider'></div>
						<div className='details-body-col2-body-sec2'>
							<h1>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque,
								reprehenderit.
							</h1>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
								neque blanditiis autem ratione! Autem, sapiente. Suscipit quasi,
								provident odit quidem aperiam molestiae! Ducimus delectus iste
								aut eos minus ipsa provident animi repellat quod, eius dolore
								dolores ullam soluta fugit rerum suscipit laborum labore illo
								aperiam placeat id repudiandae architecto quisquam.
							</p>
							<p>
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
		</div>
	);
}

export default Details;
