// export const mergeTexts = (firstText: string[], secondText: string[]) => {
// 	if (firstText.length === 0 || secondText.length === 0) return [...firstText, ...secondText];
// 	const lastFirstText = firstText[firstText.length - 1];
// 	const firstSecondText = secondText[0];

// 	let joinChar = " ";
// 	if (/^[.,!?—\-/]/.test(firstSecondText) || /[—\-]$/.test(lastFirstText)) {
// 		joinChar = "";
// 	}

// 	return [...firstText.slice(0, -1), lastFirstText + joinChar + firstSecondText, ...secondText.slice(1)];
// };

// export default mergeTexts;

export const mergeTexts = (firstText: string[], secondText: string[]) => {
	if (firstText.length === 0 || secondText.length === 0) return [...firstText, ...secondText];
	const lastFirstText = firstText[firstText.length - 1];
	let firstSecondText = secondText[0];

	let joinChar = " ";
	if (firstSecondText.startsWith("-")) {
		const lastWordFirstText = lastFirstText.split(" ").pop() || "";
		const firstWordSecondText = firstSecondText.slice(1).split(" ")[0] || "";
		console.log("merging two word incomplete words:", lastWordFirstText, firstWordSecondText);
		firstSecondText = firstSecondText.slice(1);
		joinChar = "";
	} else if (/^[.,!?—\-/]/.test(firstSecondText) || /[—\-]$/.test(lastFirstText)) {
		joinChar = "";
	}

	return [...firstText.slice(0, -1), lastFirstText + joinChar + firstSecondText, ...secondText.slice(1)];
};

export default mergeTexts;
