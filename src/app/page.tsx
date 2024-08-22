"use client";
import Header from "@/components/home/Header";
import ChatPage from "@/components/chat/ChatPage";
import Footer from "@/components/home/Footer";

export default function Home() {
	return (
		<main className="vertical mx-auto min-h-screen justify-start overflow-hidden">
			<Header />
			<ChatPage />
			<Footer />
		</main>
	);
}
