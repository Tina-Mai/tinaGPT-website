import { NextRequest, NextResponse } from "next/server";
import { generateWriting } from "@/lib/openAI/generateWriting";

export async function POST(req: NextRequest) {
	const { ogPrompt, ogGeneratedText } = await req.json();

	if (!ogPrompt || !ogGeneratedText) {
		return NextResponse.json({ error: "Original prompt and generated text are required" }, { status: 400 });
	}

	try {
		const prompt =
			"This is the original prompt: " + ogPrompt + "\n\nThis is your previous generated text: " + ogGeneratedText + "\n\nContinue writing. Only respond with the continuation of the text.";
		const continuedText = await generateWriting(prompt);
		return NextResponse.json({ generatedText: [...ogGeneratedText, ...continuedText] });
	} catch (error) {
		console.error("Error generating writing:", error);
		return NextResponse.json({ error: "Failed to generate writing" }, { status: 500 });
	}
}
