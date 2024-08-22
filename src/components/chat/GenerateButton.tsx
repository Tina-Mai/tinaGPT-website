const GenerateButton = ({ text = "Start writing", onClick }: { text?: string; onClick: () => void }) => {
	return (
		<button
			onClick={onClick}
			className="text-sm font-medium bg-background hover:bg-opacity-60 hover:scale-105 transition-all duration-150 rounded-lg py-1.5 px-3 flex items-center gap-2 self-end w-fit"
		>
			<span className="text-xs font-normal bg-zinc-400 bg-opacity-50 rounded px-1 ">⌘ ↵</span> {text}
		</button>
	);
};

export default GenerateButton;
