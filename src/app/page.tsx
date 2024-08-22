"use client";
import Header from "@/components/Header";
import ChatPage from "@/components/ChatPage";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<main className="vertical mx-auto min-h-screen justify-start overflow-hidden">
			<Header />
			{/* <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ type: "spring", damping: 20, stiffness: 100 }} className="flex-grow"> */}
			<ChatPage />
			{/* </motion.div> */}
		</main>
	);
}
