import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Root = () => {
	return (
		<>
			<Header />
			<div className="container">
				<Outlet />
			</div>
		</>
	);
};

export default Root;
