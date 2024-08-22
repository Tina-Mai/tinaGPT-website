const Input = ({ disabled, setInput, handleKeyDown }: { disabled: boolean; setInput: (value: string) => void; handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void }) => {
	return (
		<textarea
			className={`bg-transparent sm:text-lg md:text-xl ${
				disabled ? "text-zinc-500/80" : "text-black"
			} focus:outline-none focus:ring-0 w-full resize-none overflow-hidden min-h-[1.5em] placeholder-zinc-400`}
			placeholder="Write a reflective essay on..."
			rows={1}
			onInput={(e) => {
				e.currentTarget.style.height = "auto";
				e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
				setInput(e.currentTarget.value);
			}}
			onKeyDown={handleKeyDown}
			disabled={disabled}
		></textarea>
	);
};

export default Input;
