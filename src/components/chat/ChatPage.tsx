import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

const ChatPage = () => {
	const [input, setInput] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [response, setResponse] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const onSubmit = async () => {
		if (input.trim().length === 0) return;
		setSubmitted(true);
		setLoading(true);

		try {
			const response = await fetch("/api/generateWriting", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt: input }),
			});

			if (!response.ok) {
				throw new Error("Failed to generate writing");
			}

			const data = await response.json();
			setResponse(data.generatedText);
		} catch (error) {
			console.error("Error generating writing:", error);
			setResponse(["An error occurred while generating the text."]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			e.preventDefault();
			onSubmit();
		}
	};

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			transition={{ type: "spring", damping: 20, stiffness: 100 }}
			className={`flex-grow vertical w-2/3 mx-auto bg-white bg-opacity-75 ${!submitted && "hover:bg-opacity-100"} transition-all rounded-t-3xl overflow-hidden`}
		>
			<div className={`flex-grow vertical px-14 py-12 overflow-auto ${!submitted && "justify-between"} gap-5`}>
				<Input submitted={submitted} setInput={setInput} handleKeyDown={handleKeyDown} />
				{!submitted && <SubmitButton onSubmit={onSubmit} />}
				{loading && <p>Generating...</p>}
				{response &&
					response.map((paragraph, index) => (
						<p key={index} className="text-xl text-black mb-4">
							{paragraph}
						</p>
					))}
			</div>
		</motion.div>
	);
};

export default ChatPage;
