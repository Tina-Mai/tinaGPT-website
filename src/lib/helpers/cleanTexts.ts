export const cleanTexts = (texts: string[]) => {
	return texts.map((text) => text.replace(/(\*\*|\*|_|\*\*\*|\*\*\*\*|\#\#\#|\#\#|\#)/g, ""));
};

export default cleanTexts;
