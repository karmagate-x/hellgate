"use client";

import React from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import KarmaUsersAvatar from "@/components/sidebar/karmaUsers";
import { useRouter } from "next/navigation";

export default function KarmaHeader() {
	const router = useRouter();
	const gotoHome = () => {
		router.push("/");
	};
	return (
		<header className="w-full flex items-center justify-between px-3 py-3 border-b">
			<div
				className="text-xl font-bold tracking-wider cursor-pointer"
				onClick={gotoHome}
			>
				{process.env.NEXT_PUBLIC_ORG}
			</div>
			<nav>
				<SignedOut>
					<SignInButton mode="modal">
						<p className="karma-link">Sign In</p>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<KarmaUsersAvatar />
				</SignedIn>
			</nav>
		</header>
	);
}
