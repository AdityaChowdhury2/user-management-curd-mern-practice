import { createBrowserRouter } from 'react-router-dom';
import Root from '../MainLayout/Root';
import Home from '../pages/Home/Home';
import AddUser from '../pages/AddUser/AddUser';
import EditUser from '../pages/EditUser/EditUser';

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
			{
				path: '/editUser/:id',
				element: <EditUser />,
				loader: ({ params }) =>
					fetch(`http://localhost:5000/users/${params.id}`),
			},
		],
	},
]);

export default Router;
