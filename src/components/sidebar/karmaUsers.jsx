"use client";

import {useUser, useClerk, useAuth} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { KarmaAvatar } from "@/components/ui/karmaAvatar";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { KarmaThemeToggler } from "../ui/KarmaThemToggler";
import {useEffect} from "react";

export default function KarmaUsersAvatar() {
	const { user, isLoaded } = useUser();
	const { signOut, openUserProfile } = useClerk();
	const router = useRouter();

	if (!isLoaded) return <span>Loading...</span>;
	if (!user) return null;

	const gotoDashboard = () => {
		router.push("/dashboard?tab=core");
	};

    const { getToken } = useAuth();

    useEffect(() => {
        const syncUser = async () => {
            const token = await getToken();
            await fetch("/api/KarmaGateUsers/syncUsers", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        };
        syncUser();
    }, [getToken]);

    return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="p-0 rounded-full w-10 h-10">
					<KarmaAvatar
						src={user.imageUrl}
						alt={user.fullName || user.username || "User"}
						className="cursor-pointer hover:ring-2 hover:ring-black/80 hover:dark:ring-white/80 transition duration-200"
					/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-64">
				<DropdownMenuLabel className="flex justify-between gap-1 p-2">
					<div className="flex flex-col">
						<span className="font-semibold text-base">
							{user.fullName || user.username}
						</span>
						<span className="text-xs text-muted-foreground">
							{user.primaryEmailAddress?.emailAddress}
						</span>
					</div>
					<KarmaThemeToggler />
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<p variant={"ghost"} onClick={() => openUserProfile()}>
						Profile Management
					</p>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<p onClick={gotoDashboard}>Dashboard</p>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild className={"focus:text-red-700"}>
					<p onClick={() => signOut()} className="text-red-500">
						Sign out
					</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
