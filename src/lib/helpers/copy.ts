export const handleCopy = ({ text, toast }: { text: string; toast: (props: any) => void }) => {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			toast({
				title: "📋 Copied!",
				description: `"${text.split(" ").slice(0, 7).join(" ").trim()}${text.split(" ").length > 7 ? "..." : ""}"`,
			});
			console.log("Text copied to clipboard");
		})
		.catch((err) => {
			console.error("Failed to copy text: ", err);
		});
};
