"use client";
import React, { memo } from "react";
import Header from "@/components/home/Header";
import ChatPage from "@/components/chat/ChatPage";
import Footer from "@/components/home/Footer";

const MemoizedHeader = memo(Header);
const MemoizedFooter = memo(Footer);

export default function Home() {
	return (
		<main className="vertical mx-auto min-h-[calc(100dvh)] justify-start overflow-hidden">
			<MemoizedHeader />
			<ChatPage />
			<MemoizedFooter />
		</main>
	);
}
