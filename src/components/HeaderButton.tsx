import Link from "next/link";

const Tag = ({ text, bgColor, href = "/" }: { text: string; bgColor: string; href?: string }) => {
	return (
		<Link href={href} target="_blank" className="horizontal bg-white rounded-full px-3 py-1 w-fit center gap-3 bg-opacity-40 hover:bg-opacity-100 transition-all">
			<div className={`size-2 ${bgColor} rounded-full`} />
			<p className="text-sm font-medium">{text}</p>
		</Link>
	);
};

export default Tag;
