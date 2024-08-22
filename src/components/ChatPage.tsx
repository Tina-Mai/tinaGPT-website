import { motion } from "framer-motion";

const ChatPage = () => {
	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			transition={{ type: "spring", damping: 20, stiffness: 100 }}
			className="flex-grow w-2/3 mx-auto bg-white bg-opacity-75 rounded-t-3xl overflow-hidden flex flex-col"
		>
			<div className="flex-grow vertical px-14 py-12 overflow-auto justify-between gap-5">
				<textarea
					className="bg-transparent text-xl focus:outline-none focus:ring-0 w-full resize-none overflow-hidden min-h-[1.5em]"
					placeholder="Write a reflective essay on..."
					rows={1}
					onInput={(e) => {
						e.currentTarget.style.height = "auto";
						e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
					}}
				></textarea>
				<button className="group text-sm font-medium bg-background hover:bg-opacity-60 rounded-lg py-1.5 px-3 flex items-center gap-2 self-end w-fit">
					<span className="text-xs font-normal bg-zinc-400 bg-opacity-50 group-hover:bg-opacity-30 rounded px-1 ">⌘ ↵</span> Start writing
				</button>
			</div>
		</motion.div>
	);
};

export default ChatPage;
