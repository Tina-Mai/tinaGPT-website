import { BounceLoader } from "react-spinners";

const Loading = () => {
	return (
		<div className="horizontal items-center space-x-3">
			<BounceLoader color="#60a5fa" size={18} />
			<div className="text-blue-400">Working on it...</div>
		</div>
	);
};

export default Loading;
