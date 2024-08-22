const Tag = ({ text, bgColor }: { text: string; bgColor: string }) => {
	return (
		<div className="horizontal bg-white rounded-full px-3 py-1 w-fit center gap-3 bg-opacity-40 hover:bg-opacity-100">
			<div className={`size-2 ${bgColor} rounded-full`} />
			<p className="text-sm font-mono">{text}</p>
		</div>
	);
};

export default Tag;
