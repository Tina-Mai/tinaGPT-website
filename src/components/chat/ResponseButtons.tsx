import { XCircleIcon } from "@heroicons/react/24/outline";
import ActionButton from "./ActionButton";
import GenerateButton from "./GenerateButton";

const ResponseButtons = ({ handleCancel, onRewrite, onCopy, onContinue }: { handleCancel: () => void; onRewrite: () => void; onCopy: () => void; onContinue: () => void }) => {
	return (
		<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 sm:gap-1 mt-5">
			<button onClick={handleCancel} className="order-2 sm:order-1 horizontal center gap-2 text-zinc-500/80">
				<XCircleIcon className="size-4" />
				<p className="text-sm font-medium">Cancel</p>
			</button>
			<div className="order-1 sm:order-2 flex flex-wrap justify-center sm:justify-start gap-3">
				<ActionButton text="Rewrite" onClick={onRewrite} />
				<ActionButton text="Copy" onClick={onCopy} />
				<GenerateButton text="Continue writing" onClick={onContinue} />
			</div>
		</div>
	);
};

export default ResponseButtons;
