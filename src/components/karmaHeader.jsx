"use client";

import React from "react";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import KarmaUsersAvatar from "@/components/sidebar/karmaUsers";
import { useRouter } from "next/navigation";
import { KarmaGate } from "@/components/icons/KarmaGateIcons";
import { Skeleton } from "@/components/ui/skeleton";

export default function KarmaHeader() {
    const router = useRouter();
    const { isLoaded } = useUser();

    const gotoHome = () => {
        router.push("/");
    };

    return (
        <header className="w-full flex items-center justify-between px-3 py-3 border-b">
            <div
                className="text-xl font-bold tracking-wider cursor-pointer"
                onClick={gotoHome}
            >
                <KarmaGate className="w-32 sm:w-42" />
            </div>

            <nav>
                {!isLoaded ? (
                    <Skeleton className="h-8 w-8 rounded-full" />
                ) : (
                    <>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <p className="karma-link">Sign In</p>
                            </SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <KarmaUsersAvatar />
                        </SignedIn>
                    </>
                )}
            </nav>
        </header>
    );
}
