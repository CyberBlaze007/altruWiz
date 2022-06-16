import { motion } from 'framer-motion';
import { useContext } from 'react';
import DataService from '../../firebase/services';
import { UserContext } from './../../App';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase-config';

function Delete({ showModal, setShowModal, participants, event }: any) {
	const user = useContext(UserContext);
	// Delete on firebase storage
	const folderRef = ref(storage, `eventImages/${user.uid}/${event.eventCode}/image`);

	const deleteEvent = async () => {
		if (participants > 0) {
			alert('You cannot delete this event since there are already participants.');
			return;
		}
		let eventsCreated: any = [];

		await DataService.getOrg(user.uid)
			.then((docSnap) => {
				eventsCreated = docSnap.data().eventsCreated;
			})
			.finally(async () => {
				const index = eventsCreated.indexOf(event.eventCode);
				eventsCreated = eventsCreated.filter((event) => {
					return event != eventsCreated.at(index);
				});
				console.log('eventsCreated:', eventsCreated);
				await DataService.updateOrg(
					{
						eventsCreated: eventsCreated,
					},
					user.uid,
				);
			});

		await DataService.deleteEvent(event.eventCode)
			.then(() => alert('Event deleted successfully'))
			.catch((error) => {
				alert(error);
				// Uh-oh, an error occurred!
			});

		// Delete the file
		await deleteObject(folderRef).catch((error) => {
			alert(error);
			// Uh-oh, an error occurred!
		});
	};
	return (
		<motion.div
			initial={{
				scale: 0,
				opacity: 0,
			}}
			animate={showModal ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
			transition={
				showModal
					? {
							scale: { duration: 0.1, type: 'tween' },
							opacity: { delay: 0.1, duration: 0.3, type: 'tween' },
					  }
					: {
							scale: { delay: 0.6, duration: 0.1, type: 'tween' },
							opacity: { delay: 0.3, duration: 0.3, type: 'tween' },
					  }
			}
			className='confirm'>
			<div className='confirm-container'>
				<div className='confirm-container-top'>
					<h1>Do you want to delete this event?</h1>
				</div>
				<div className='confirm-container-bottom'>
					<button
						onClick={() => {
							setShowModal(false);
							deleteEvent();
						}}>
						Yes
					</button>
					<button
						onClick={() => {
							setShowModal(false);
						}}>
						No
					</button>
				</div>
			</div>
		</motion.div>
	);
}

export default Delete;
