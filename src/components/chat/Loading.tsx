import { BounceLoader } from "react-spinners";

const Loading = () => {
	return (
		<div className="horizontal items-center space-x-3">
			<BounceLoader color="#3b82f6" size={18} />
			<div className="text-blue-400">Working on it...</div>
		</div>
	);
};
