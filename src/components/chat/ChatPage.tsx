import React, { useState, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { handleCopy } from "@/lib/helpers/copy";
import { mergeTexts } from "@/lib/helpers/mergeTexts";
import { cleanTexts } from "@/lib/helpers/cleanTexts";
import { useToast } from "@/components/ui/use-toast";
import Input from "./Input";
import GenerateButton from "./GenerateButton";
import ResponseButtons from "./ResponseButtons";
import Loading from "./Loading";

const ChatPage = () => {
	const [input, setInput] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [generatedText, setGeneratedText] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const [focused, setFocused] = useState(false);
	const { toast } = useToast();
	const errorMessage = ["An error occurred while generating the writing :(", "An error occurred while continuing the writing :("];

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
				throw new Error(errorMessage[0]);
			}
			const data = await response.json();
			setGeneratedText(cleanTexts(data.generatedText));
		} catch (error) {
			console.error("Error generating writing:", error);
			setGeneratedText([errorMessage[0]]);
		} finally {
			setLoading(false);
		}
	};

	const onRewrite = async () => {
		setGeneratedText([]);
		onSubmit();
	};

	const onContinue = async () => {
		setLoading(true);
		try {
			const response = await fetch("/api/continueWriting", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ogPrompt: input, ogGeneratedText: generatedText }),
			});
			if (!response.ok) throw new Error(errorMessage[1]);
			const { generatedText: newText } = await response.json();
			setGeneratedText((prevText) => {
				return mergeTexts(prevText, cleanTexts(newText));
			});
		} catch (error) {
			console.error("Error continuing writing:", error);
			setGeneratedText((prevText) => [...prevText, errorMessage[1]]);
		} finally {
			setLoading(false);
		}
	};

	// handle ⌘ + Enter
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
			// if not submitted: submit input to start generation
			if (!submitted) {
				e.preventDefault();
				onSubmit();
				// if submitted: continue generation
			} else {
				e.preventDefault();
				onContinue();
			}
		}
	};

	const handleCancel = () => {
		setGeneratedText([]);
		setSubmitted(false);
	};

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			transition={{ type: "spring", damping: 20, stiffness: 100 }}
			className={`flex-grow vertical mx-5 sm:mx-auto sm:w-4/5 md:w-2/3 bg-white ${
				!submitted ? (focused ? "bg-opacity-100" : "hover:bg-opacity-100 bg-opacity-75") : "bg-opacity-75"
			} rounded-t-2xl overflow-hidden`}
		>
			<div className={`flex-grow vertical px-8 py-8 sm:px-14 sm:py-12 overflow-auto ${!submitted ? "justify-between gap-5" : "gap-7"}`}>
				<Input disabled={submitted} setInput={setInput} handleKeyDown={handleKeyDown} setFocused={setFocused} />
				{!submitted && <GenerateButton text="Start writing" onClick={onSubmit} />}
				{loading && generatedText.length <= 0 && <Loading />}
				{submitted && generatedText.length > 0 && (
					<>
						{generatedText.map((paragraph, index) => (
							<p
								key={index}
								className={`sm:text-lg md:text-xl -mb-3 ${(paragraph === errorMessage[0] || paragraph === errorMessage[1]) && "text-rose-400 text-sm italic"}`}
								dangerouslySetInnerHTML={{
									__html: paragraph
										.replace(/^(#{1,3})\s(.*)$/gm, "<strong>$2</strong>")
										.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
										.replace(/\*(.*?)\*/g, "<em>$1</em>"),
								}}
							/>
						))}
						{loading && <Loading />}
						<ResponseButtons handleCancel={handleCancel} onRewrite={onRewrite} onCopy={() => handleCopy({ text: generatedText.join("\n\n"), toast })} onContinue={onContinue} />
					</>
				)}
			</div>
		</motion.div>
	);
};

export default ChatPage;
