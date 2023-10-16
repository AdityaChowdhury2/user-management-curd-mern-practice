import axios from 'axios';
import { useState } from 'react';
import { BiSolidUser } from 'react-icons/bi';
import { MdModeEditOutline } from 'react-icons/md';
import { MdOutlineDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
const Home = () => {
	const loadedUsers = useLoaderData();
	const [users, setUsers] = useState(loadedUsers);

	const handleDelete = async id => {
		const swalRes = await Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		});
		if (swalRes.isConfirmed) {
			try {
				const response = await axios.delete(
					`https://user-management-mern-server.vercel.app/users/${id}`
				);
				if (response.data.deletedCount) {
					setUsers(users.filter(user => user._id !== id));
					Swal.fire('Deleted!', 'The user has been deleted.', 'success');
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	return (
		<div className="mt-12">
			<Link to={'/addUser'}>
				<button className="flex  items-center gap-1 text-indigo-800 p-2 mb-10 font-semibold">
					New User
					<BiSolidUser />
				</button>
			</Link>
			<div className="overflow-x-auto">
				<table className="table text-center">
					{/* head */}
					<thead>
						<tr className="bg-slate-700 text-neutral-300 ">
							<th>Id</th>
							<th>Name</th>
							<th>Email</th>
							<th>Gender</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						{users.map((user, index) => (
							<tr className="hover" key={user._id}>
								<th>{index + 1}</th>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.gender}</td>
								<td>{user.status}</td>
								<td className="space-x-1">
									<Link to={`/editUser/${user._id}`}>
										<button className="btn">
											<MdModeEditOutline size={20} color="#3730a3" />
										</button>
									</Link>
									<button
										className="btn"
										onClick={() => handleDelete(user._id)}
									>
										<MdOutlineDelete size={21} color="#3730a3" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Home;
