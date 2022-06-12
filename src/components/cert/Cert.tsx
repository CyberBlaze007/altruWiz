import useFitText from 'use-fit-text';

// import React, { useEffect, useRef } from 'react';
function Cert({ name, title, org, date }: any) {
	const { ref, fontSize } = useFitText({ maxFontSize: 150, minFontSize: 1 });
	return (
		<div className='cert' id='cert'>
			<div className='cert-name'>
				<h1 ref={ref} style={{ fontSize }}>
					{name}
				</h1>
			</div>

			<CertDesc title={title} org={org} date={date} />
		</div>
	);
}

function CertDesc({ title, org, date }: any) {
	const { ref, fontSize } = useFitText({ maxFontSize: 100, minFontSize: 0.5 });
	return (
		<div className='cert-desc'>
			<p ref={ref} style={{ fontSize }}>
				for actively participating and completing the community event "{title}" conducted on {date}. This event was initiated by {org} and hosted by
				AltruWiz Inc.
			</p>
		</div>
	);
}

export default Cert;
