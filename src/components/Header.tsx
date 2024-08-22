import Image from "next/image";
import Tag from "./Tag";
import openaiLogo from "@/assets/openai.svg";

const Header = () => {
	return (
		<header className="vertical py-16 w-3/5 mx-auto justify-start gap-3">
			<h1 className="text-4xl tracking-wide">TinaGPT</h1>
			<p className="text-xl text-zinc-500/80 font-serif italic tracking-wide pb-1">
				trained on ~10k tokens to write beautifully and *interestingly*. finetuned on{" "}
				<span className="inline-block items-center gap-2">
					<Image src={openaiLogo} alt="GPT-4o" width={15} height={15} className="inline mb-1 opacity-35" /> GPT-4o.
				</span>
			</p>
			<div className="horizontal gap-2">
				<Tag text="how to prompt TinaGPT" bgColor="bg-blue-400" />
				<Tag text="source code" bgColor="bg-lime-500" />
				<Tag text="give feedback" bgColor="bg-indigo-400" />
			</div>
		</header>
	);
};

export default Header;
