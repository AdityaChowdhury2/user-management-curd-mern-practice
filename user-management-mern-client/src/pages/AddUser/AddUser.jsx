import { Link } from 'react-router-dom';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddUser = () => {
	const handleSubmit = async e => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const gender = form.gender.value;
		const status = form.status.value;
		console.log(name, email, gender, status);

		try {
			const response = await axios.post(
				'http://localhost:5000/users',
				{
					name,
					email,
					gender,
					status,
				},
				{ headers: { 'Content-Type': 'application/json' } }
			);
			if (response.data.insertedId) {
				Swal.fire('Nice Job', 'User Added Successfully', 'success');
			}
			form.reset();
		} catch (e) {
			console.log(e);
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
			<form className="card-body gap-4" onSubmit={handleSubmit}>
				<div className="text-center space-y-2">
					<h3 className="font-semibold text-xl">New user</h3>
					<p className="text-gray-400">
						Use the bellow form to create a new account
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
					/>
				</div>
				<div className="form-control ">
					<label htmlFor="email">Email</label>
					<input
						className="input input-bordered"
						type="text"
						name="email"
						id="email"
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

export default AddUser;
