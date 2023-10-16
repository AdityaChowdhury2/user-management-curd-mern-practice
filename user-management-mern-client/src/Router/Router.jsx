import { createBrowserRouter } from 'react-router-dom';
import Root from '../MainLayout/Root';
import Home from '../pages/Home/Home';
import AddUser from '../pages/AddUser/AddUser';

const Router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Home />,

				loader: () => fetch('http://localhost:5000/users'),
			},
			{
				path: '/addUser',
				element: <AddUser />,
			},
		],
	},
]);

export default Router;
