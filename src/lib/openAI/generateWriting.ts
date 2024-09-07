import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const finetunedModel = process.env.FINETUNED_MODEL || "";

export async function generateWriting(prompt: string, max_tokens: number = 100): Promise<string[]> {
	try {
		const response = await openai.chat.completions.create({
			// model: "gpt-4o-mini",
			model: finetunedModel,
			messages: [
				{
					role: "system",
					content:
						"You are an AI assistant designed to write in a beautifully crafted style, reflecting the thoughtful, ambitious, and reflective nature of the user. Your responses should be well-considered, articulate, and deeply insightful, reflecting a unique voice and perspective.",
				},
				{ role: "user", content: prompt },
			],
			max_tokens: max_tokens, // use the provided max_tokens or default to 100
			temperature: 0.8, // temperature for creativity control
			n: 1, // number of completions to generate
		});

		const content = response.choices[0].message.content || "No response generated.";
		return content.split("\n\n").filter((paragraph) => paragraph.trim() !== "");
	} catch (error) {
		console.error("Error calling OpenAI API:", error);
		throw new Error("Failed to generate writing");
	}
}
