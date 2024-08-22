"use client";
import Header from "@/components/Header";

export default function Home() {
	return (
		<main className="vertical mx-auto min-h-screen justify-start">
			<Header />

			{/* white page component */}
			<div className="flex-grow w-2/3 mx-auto bg-white bg-opacity-75 rounded-t-3xl overflow-hidden flex flex-col">
				<div className="flex-grow p-10 overflow-auto justify-between">
					<textarea
						className="bg-transparent text-lg focus:outline-none focus:ring-0 w-full resize-none overflow-hidden min-h-[1.5em]"
						placeholder="Write a reflective essay on..."
						rows={1}
						onInput={(e) => {
							e.currentTarget.style.height = "auto";
							e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
						}}
					></textarea>
					{/* <button className="bg-black text-white px-4 py-1.5 rounded-full">Start writing</button> */}
					<button className="group text-sm font-medium bg-background hover:bg-opacity-60 rounded-lg py-1.5 px-3 flex items-center gap-2">
						<span className="text-xs font-normal bg-zinc-400 bg-opacity-50 group-hover:bg-opacity-30 rounded px-1 ">⌘ ↵</span> Start writing
					</button>
				</div>
			</div>
		</main>
	);
}
