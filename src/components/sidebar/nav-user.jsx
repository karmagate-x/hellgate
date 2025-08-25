"use client";

import * as React from "react";
import {
    Settings2,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut, Key,
} from "lucide-react";

import { KarmaAvatar } from "@/components/ui/karmaAvatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Copy, Check } from "lucide-react";
import {Button} from "@/components/ui/button";
import {ApiKeySkeleton} from "@/components/loading/karmaSkeleton";

export function NavUser({
	user,
	isLoaded,
	signOut,
	openUserProfile,
	subscription,
}) {
	const { isMobile } = useSidebar();
    const { getToken } = useAuth();
    const [karmaGateUser, setKarmaGateUser] = useState(null);
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            const token = await getToken();

            const res = await fetch("/api/KarmaGateUsers/listUsers", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                const data = await res.json();
                setKarmaGateUser(data);
            } else {
                // console.error("Failed to fetch user:", res.status);
            }
        };

        fetchUser();
    }, [getToken]);

    function CopyButton({ text }) {
        const [copied, setCopied] = useState(false);

        const handleCopy = async () => {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        return (
            <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCopy}
                title={"Copy Apikey"}
            >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
        );
    }

    return (
        <>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Your API Key</AlertDialogTitle>
                        <AlertDialogDescription>
                            Here’s your personal API key. Keep it safe.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="rounded border p-3 font-mono text-xs flex items-center justify-between gap-2">
                        {!karmaGateUser ? (
                            <ApiKeySkeleton />
                        ) : (
                            <>
                                <p className="truncate max-w-[180px] sm:max-w-full">
                                    {karmaGateUser.karmaGateApikey}
                                </p>
                                <CopyButton text={karmaGateUser.karmaGateApikey} />
                            </>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                            Close
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <KarmaAvatar
                                        src={user.imageUrl}
                                        alt={
                                            user.username ||
                                            user.fullName ||
                                            process.env.NEXT_PUBLIC_ORG
                                        }
                                        className="cursor-pointer hover:ring-2 hover:ring-black/80 hover:dark:ring-white/80 transition duration-200"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        {user.username.toUpperCase() ||
                                            user.fullName ||
                                            process.env.NEXT_PUBLIC_ORG}
                                    </span>
                                    <span className="truncate text-xs">
                                        {/* {user.primaryEmailAddress?.emailAddress} */}
                                        {subscription}
                                    </span>
                                </div>
                                <ChevronsUpDown className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            side={isMobile ? "bottom" : "right"}
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <KarmaAvatar
                                        src={user.imageUrl}
                                        alt={
                                            user.username ||
                                            user.fullName ||
                                            process.env.NEXT_PUBLIC_ORG
                                        }
                                        className="cursor-pointer hover:ring-2 hover:ring-black/80 hover:dark:ring-white/80 transition duration-200"
                                    />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">
                                            {user.fullName ||
                                                user.username ||
                                                process.env.NEXT_PUBLIC_ORG}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.primaryEmailAddress?.emailAddress}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel className={"text-center"}>
                                    <p className="text-xs">
                                        {process.env.NEXT_PUBLIC_ORG} Account Management
                                    </p>
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Settings2 />
                                    <p onClick={() => openUserProfile()} className={'w-full'}>
                                        Manage Account
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setOpenDialog(true)}>
                                    <Key />
                                    <p className={'w-full'}>
                                        Your Apikey
                                    </p>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard />
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Bell />
                                    Notifications
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <LogOut />
                                <p
                                    onClick={() => signOut()}
                                    className="text-red-500 font-semibold w-full"
                                >
                                    Sign out
                                </p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </>
	);
}
