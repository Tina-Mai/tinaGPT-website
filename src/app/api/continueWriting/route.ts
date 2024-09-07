import { NextRequest, NextResponse } from "next/server";
import { generateWriting } from "@/lib/openAI/generateWriting";
import { cleanTexts } from "@/lib/helpers/cleanTexts";

export async function POST(req: NextRequest) {
	const { ogPrompt, ogGeneratedText } = await req.json();

	if (!ogPrompt || !ogGeneratedText) {
		return NextResponse.json({ error: "Original prompt and generated text are required" }, { status: 400 });
	}

	// check if texts (strings[]) are equal or if one contains the other
	function areTextsEqualOrContained(text1: string[], text2: string[]) {
		const normalizeText = (textArray: string[]) => {
			return textArray.join(" ").replace(/\s+/g, " ").replace(/\n/g, " ").replace(/\*/g, "").trim().toLowerCase();
		};
		const text1Str = normalizeText(text1);
		const text2Str = normalizeText(text2);
		return text1Str === text2Str || text1Str.includes(text2Str) || text2Str.includes(text1Str);
	}

	// if the first part of firstText overlaps with the last part of the secondText, remove the overlap
	function removeOverlap(firstText: string[], secondText: string[]) {
		const cleanFirstText = cleanTexts(firstText);
		const cleanSecondText = cleanTexts(secondText);
		const lastText = cleanFirstText[cleanFirstText.length - 1].trim();
		const firstContinuedText = cleanSecondText[0].trim();
		for (let i = 0; i < lastText.length; i++) {
			const possibleOverlap = lastText.slice(i);
			if (firstContinuedText.startsWith(possibleOverlap)) {
				const result = secondText[0].replace(/^\.{3}\s*/, "").slice(possibleOverlap.length);
				return [result, ...secondText.slice(1)];
			}
		}
		const noOverlapResult = secondText[0].replace(/^\.{3}\s*/, "");
		return [noOverlapResult, ...secondText.slice(1)];
	}

	try {
		const prompt = `Original prompt: "${ogPrompt}"

        Previously generated text:
        "${ogGeneratedText}"

        ---
        Continue from the last sentence, maintaining the style, tone, and context. Do not repeat the text above. Your response to be able to be seamlessly appended to the end of the previous text.`;

		// generate text until it's not equal to the original text (or even contains it)
		let continuedText: string[] = [];
		let attempts = 0;
		const maxAttempts = 3;
		do {
			continuedText = await generateWriting(prompt);
			attempts++;
		} while (areTextsEqualOrContained(ogGeneratedText, continuedText) && attempts < maxAttempts);
		if (attempts >= maxAttempts) {
			console.error("Failed to generate unique continuation after multiple attempts");
			return NextResponse.json({ generatedText: continuedText }, { status: 500 });
		}

		// remove any overlap with the original generated text
		continuedText = removeOverlap(ogGeneratedText, continuedText);
		return NextResponse.json({ generatedText: continuedText });
	} catch (error) {
		console.error("Error generating writing:", error);
		return NextResponse.json({ error: "Failed to generate writing" }, { status: 500 });
	}
}
