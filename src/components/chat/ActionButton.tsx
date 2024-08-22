"use client";
const ActionButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
	return (
		<button
			onClick={onClick}
			className="text-sm font-medium bg-zinc-700 text-white hover:bg-opacity-80 hover:scale-105 transition-all duration-150 rounded-lg py-1.5 px-3 flex items-center gap-2 self-end w-fit"
		>
			{text}
		</button>
	);
};

export default ActionButton;
