import axios from 'axios';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUser = () => {
	const navigate = useNavigate();
	const loadedUsers = useLoaderData();
	console.log(loadedUsers);
	const handleEdit = async e => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const gender = form.gender.value;
		const status = form.status.value;

		const response = await axios.put(
			`https://user-management-mern-server.vercel.app/users/${loadedUsers._id}`,
			{ name, email, gender, status },
			{ headers: { 'Content-Type': 'application/json' } }
		);
		console.log(response);
		if (response.data.modifiedCount) {
			Swal.fire({
				icon: 'success',
				title: 'User Data Modified Successfully',
				showConfirmButton: false,
				timer: 1500,
			});
			navigate('/');
		}
	};
	return (
		<div className="mt-12">
			<Link to={'/'}>
				<button className="flex font-semibold items-center gap-1 text-indigo-800 p-2 mb-10 ">
					<AiOutlineDoubleLeft />
					All Users
				</button>
			</Link>
			<form className="card-body gap-4" onSubmit={handleEdit}>
				<div className="text-center space-y-2">
					<h3 className="font-semibold text-xl">Edit User</h3>
					<p className="text-gray-400">
						Use the bellow form to edit a user details
					</p>
				</div>
				<div className="form-control ">
					<label htmlFor="name" className="label">
						Name
					</label>
					<input
						className="input input-bordered"
						type="text"
						name="name"
						id="name"
						defaultValue={loadedUsers.name}
					/>
				</div>
				<div className="form-control ">
					<label htmlFor="email">Email</label>
					<input
						className="input input-bordered"
						type="text"
						name="email"
						id="email"
						defaultValue={loadedUsers.email}
					/>
				</div>
				<div className="flex items-center gap-4 md:gap-12">
					<span>Gender</span>
					<label htmlFor="male" className="flex items-center gap-2 md:gap-4">
						<input
							type="radio"
							name="gender"
							value="Male"
							className="radio checked:bg-teal-500"
							id="male"
							defaultChecked={loadedUsers.gender === 'Male'}
						/>
						<span>Male</span>
					</label>

					<label htmlFor="female" className="flex items-center gap-2 md:gap-4">
						<input
							type="radio"
							name="gender"
							value="Female"
							className="radio checked:bg-teal-500"
							id="female"
							defaultChecked={loadedUsers.gender === 'Female'}
						/>
						<span>Female</span>
					</label>
				</div>
				<div className="flex items-center gap-4 md:gap-12">
					<span>Status</span>
					<label htmlFor="active" className="flex items-center gap-2 md:gap-4">
						<input
							type="radio"
							name="status"
							value="Active"
							className="radio checked:bg-teal-500"
							id="active"
							defaultChecked={loadedUsers.status === 'Active'}
						/>
						<span>Active</span>
					</label>
					<label
						htmlFor="inactive"
						className="flex items-center gap-2 md:gap-4"
					>
						<input
							type="radio"
							name="status"
							value="Inactive"
							className="radio checked:bg-teal-500"
							id="inactive"
							defaultChecked={loadedUsers.status === 'Inactive'}
						/>
						<span>Inactive</span>
					</label>
				</div>
				<button className="bg-teal-500 hover:bg-teal-600 text-gray-700 py-1 rounded">
					Save
				</button>
			</form>
		</div>
	);
};

export default EditUser;
