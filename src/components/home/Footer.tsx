const Footer = () => {
	return (
		<div className="hidden md:block">
			<p className="fixed bottom-3 left-3 text-sm text-zinc-500/80 p-2">v.0.0.1</p>
			<p className="fixed bottom-3 right-3 text-sm text-zinc-500/80 p-2">
				by{" "}
				<a href="https://tinamai.xyz" target="_blank" className="text-zinc-500/80 hover:text-zinc-500 underline">
					tina mai
				</a>
			</p>
		</div>
	);
};

export default Footer;
