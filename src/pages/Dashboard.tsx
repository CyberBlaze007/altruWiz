import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

//Tabs Components
import { TabUnstyled, TabsListUnstyled, TabsUnstyled } from '@mui/base';
import { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';

//Tab Pages
import Badges from '../components/cards/Badges';
import Certificates from '../components/cards/Certificates';
import Events from '../components/cards/Events';
import Profile from './../components/cards/Profile';
import Achievements from './../components/cards/Achievements';

//MUI Components
import { styled } from '@mui/system';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//Local Components
import DBNav from './../components/navbar/DBNav';
import Footer from './../components/footer/Footer';
import Navigator from '../components/navigations/Navigator';
import Code from '../components/modals/Code';

function Dashboard() {
	const tabs = [
		'/dashboard/profile',
		'/dashboard/events',
		'/dashboard/achievements',
		'/dashboard/certificates',
		'/dashboard/badges',
	];
	const navigate = useNavigate();
	const location = useLocation();
	const [index, setIndex] = useState(0);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const div = document.querySelector('html');
		div.scrollTo(0, 0);
		setIndex(tabs.indexOf(location.pathname));
	}, [location]);

	const cards = [
		<Profile />,
		<Events />,
		<Achievements />,
		<Certificates />,
		<Badges />,
	];
	const Tab = styled(TabUnstyled)`
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		color: black;
		cursor: pointer;
		font-size: 1.2rem;
		background-color: transparent;
		padding: 1rem 1.2rem;
		border: none;
		display: flex;
		&:hover {
			border-bottom: 5px solid rgba(115, 57, 171, 0.15);
		}

		&:focus {
			border-bottom: 5px solid #7339ab;
		}

		&.${tabUnstyledClasses.selected} {
			border-bottom: 5px solid #7339ab;
		}

		&.${buttonUnstyledClasses.disabled} {
			opacity: 0.5;
			cursor: not-allowed;
		}
	`;

	const TabsList = styled(TabsListUnstyled)`
		width: 100%;
		display: flex;
		justify-content: space-between;
		overflow: auto;
	`;

	return (
		<div className='dashboard'>
			{/* <Navigator /> */}
			<Code showModal={showModal} setShowModal={setShowModal} />
			<div className='dashboard-container'>
				<div className='dashboard-container-nav'>
					<DBNav />
				</div>
				<TabsUnstyled
					defaultValue={0}
					value={index}
					className='dashboard-container-tab'>
					{/* <ArrowBackIosIcon className='dashboard-container-control' /> */}
					<TabsList className='dashboard-container-tab-list' id={'tablist'}>
						<Tab
							onClick={() => {
								navigate('/dashboard/profile');
							}}>
							Profile
						</Tab>
						<Tab
							onClick={() => {
								navigate('/dashboard/events');
							}}>
							Events
						</Tab>
						<Tab
							onClick={() => {
								navigate('/dashboard/achievements');
							}}>
							Achievements
						</Tab>
						<Tab
							onClick={() => {
								navigate('/dashboard/certificates');
							}}>
							Certificates
						</Tab>
						<Tab
							onClick={() => {
								navigate('/dashboard/badges');
							}}>
							Badges
						</Tab>
					</TabsList>
					{/* <ArrowForwardIosIcon className='dashboard-container-control' /> */}
				</TabsUnstyled>
			</div>
			<div className='dashboard-body'>{cards[index]}</div>
			<div className='dashboard-footer'>
				<Footer />
			</div>
		</div>
	);
}

export default Dashboard;
