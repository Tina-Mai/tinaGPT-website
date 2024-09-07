import Image from "next/image";
import HeaderButton from "./HeaderButton";
import openaiLogo from "@/assets/openai.svg";

const Header = () => {
	return (
		<header className="vertical py-8 sm:py-16 w-3/5 mx-auto justify-center sm:justify-start gap-3">
			<h1 className="text-3xl sm:text-4xl tracking-wide text-center sm:text-left">TinaGPT</h1>
			<p className="text-lg sm:text-xl text-zinc-500/80 font-serif italic pb-1 text-center sm:text-left">
				trained to on ~10k tokens to write, at the very least, *interestingly*. finetuned on{" "}
				<span className="inline-block items-center gap-2">
					<Image src={openaiLogo} alt="GPT-4o" width={15} height={15} className="inline mb-1 opacity-35" /> GPT-4o.
				</span>
			</p>
			<div className="flex flex-wrap justify-center sm:justify-start sm:gap-2">
				<HeaderButton text="how to prompt" bgColor="bg-blue-400" />
				<HeaderButton text="source code" bgColor="bg-lime-500" href="https://github.com/tina-mai/tinagpt" />
				<HeaderButton text="bugs log" bgColor="bg-rose-400" />
			</div>
		</header>
	);
};

export default Header;
