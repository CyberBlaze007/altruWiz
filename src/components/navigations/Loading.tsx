import { HashLoader } from 'react-spinners';

function Loading() {
	return (
		<div className={'modal display-flex'}>
			<section className='modal-main'>
				<HashLoader size={100} color={'#9013FE'} />
			</section>
		</div>
	);
}

export default Loading;
