import { NextRequest, NextResponse } from "next/server";
import { generateWriting } from "@/lib/openAI/generateWriting";

export async function POST(req: NextRequest) {
	const { prompt } = await req.json();

	if (!prompt) {
		return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
	}

	try {
		const generatedText = await generateWriting(prompt);
		return NextResponse.json({ generatedText });
	} catch (error) {
		console.error("Error generating writing:", error);
		return NextResponse.json({ error: "Failed to generate writing" }, { status: 500 });
	}
}
