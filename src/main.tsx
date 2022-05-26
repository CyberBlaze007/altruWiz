import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import './components/components.scss';
import './index.scss';

//React Router Components
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
