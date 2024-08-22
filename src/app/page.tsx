"use client";
import Header from "@/components/Header";
import ChatPage from "@/components/ChatPage";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<main className="vertical mx-auto min-h-screen justify-start overflow-hidden">
			<Header />
			<ChatPage />
			<Footer />
		</main>
	);
}
