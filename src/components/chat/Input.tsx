const Input = ({ submitted, setInput, handleKeyDown }: { submitted: boolean; setInput: (value: string) => void; handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void }) => {
	return (
		<textarea
			className={`bg-transparent text-xl ${submitted ? "text-zinc-500/80" : "text-black"} focus:outline-none focus:ring-0 w-full resize-none overflow-hidden min-h-[1.5em] placeholder-zinc-400`}
			placeholder="Write a reflective essay on..."
			rows={1}
			onInput={(e) => {
				e.currentTarget.style.height = "auto";
				e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
				setInput(e.currentTarget.value);
			}}
			onKeyDown={handleKeyDown}
			disabled={submitted}
		></textarea>
	);
};

export default Input;
