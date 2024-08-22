import { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { handleCopy } from "@/lib/helpers/copy";
import { useToast } from "@/components/ui/use-toast";
import Input from "./Input";
import GenerateButton from "./GenerateButton";
import ActionButton from "./ActionButton";

const ChatPage = () => {
	const [input, setInput] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [response, setResponse] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

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

	const onRewrite = async () => {
		setResponse([]);
		onSubmit();
	};

	const onContinue = async () => {
		// continue generation
	};

	// handle ⌘ + Enter
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			// if not submitted, submit input to start generation
			if (!submitted) {
				e.preventDefault();
				onSubmit();
			}
			// if submitted, continue generation
		}
	};

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			transition={{ type: "spring", damping: 20, stiffness: 100 }}
			className={`flex-grow vertical w-2/3 mx-auto bg-white bg-opacity-75 ${!submitted && "hover:bg-opacity-100"} transition-all rounded-t-3xl overflow-hidden`}
		>
			<div className={`flex-grow vertical px-14 py-12 overflow-auto ${!submitted ? "justify-between gap-5" : "gap-10"}`}>
				<Input submitted={submitted} setInput={setInput} handleKeyDown={handleKeyDown} />
				{!submitted && <GenerateButton text="Start writing" onClick={onSubmit} />}
				{loading && <p>Generating...</p>}
				{submitted && !loading && response && (
					<>
						{response.map((paragraph, index) => (
							<p key={index} className="text-xl text-black -mb-3">
								{paragraph}
							</p>
						))}
						<div className="horizontal space-between gap-2">
							<button className="horizontal center">
								<p className="text-sm font-medium text-zinc-500/80">Cancel</p>
							</button>
							<div className="flex gap-3">
								<ActionButton text="Rewrite" onClick={onRewrite} />
								<ActionButton text="Copy" onClick={() => handleCopy({ text: response.join("\n\n"), toast })} />
								<GenerateButton text="Continue writing" onClick={onContinue} />
							</div>
						</div>
					</>
				)}
			</div>
		</motion.div>
	);
};

export default ChatPage;
