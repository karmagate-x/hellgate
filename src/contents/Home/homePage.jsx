"use client";
import React from "react";
import KarmaHeader from "@/components/karmaHeader";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {motion} from "motion/react";

export default function HomePageContents() {
    const router = useRouter();
    const gotoAbout = async () => {
        router.push("/about");
    };

    return (
        <>
            <KarmaHeader />

            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5, ease: "easeInOut"}}
                className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
                <Button
                    onClick={gotoAbout}
                >
                    Test Loading
                </Button>

                <div className="text-lg font-medium">KONTEN HOME ACAN</div>
            </motion.div>
        </>
    );
}
