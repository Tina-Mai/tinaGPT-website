import Link from "next/link";

const HeaderButton = ({ text, bgColor, href = "/" }: { text: string; bgColor: string; href?: string }) => {
	return (
		<Link href={href} target="_blank" className="inline-flex items-center bg-white rounded-full px-3 py-1 bg-opacity-40 hover:bg-opacity-100 transition-all m-1">
			<div className={`w-2 h-2 ${bgColor} rounded-full mr-2`} />
			<p className="text-sm font-medium whitespace-nowrap">{text}</p>
		</Link>
	);
};

export default HeaderButton;
