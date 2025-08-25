"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { KarmaSidebar } from "@/components/sidebar/karmaSidebar";
import KarmaBreadcrumb from "@/components/KarmaBreadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import StatisticTab from "@/tab/statistic";
import CreateShortlinksTab from "@/tab/createShortlinks";
import ManageShortlinksTab from "@/tab/manageShortlinks";
import WhitelistedIpsTab from "@/tab/whitelistedIps";
import BlacklistedIpsTab from "@/tab/blacklistedIps";
import CoreDashboard from "@/tab/dashboardCore";
import { AnimatePresence, motion } from "motion/react"

export default function DashboardPageContents() {
	const { isSignedIn, isLoaded } = useUser();
	const router = useRouter();
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab") || "core";

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			router.replace("/");
		}
	}, [isLoaded, isSignedIn, router]);

	if (!isSignedIn) {
		return null;
	}

	function renderTabComponent() {
		if (tab === "statisctics") {
			return <StatisticTab />;
		} else if (tab === "create_shortlinks") {
			return <CreateShortlinksTab />;
		} else if (tab === "manage_shortlinks") {
			return <ManageShortlinksTab />;
		} else if (tab === "whitelisted_ips") {
			return <WhitelistedIpsTab />;
		} else if (tab === "blacklisted_ips") {
			return <BlacklistedIpsTab />;
		} else if (tab === "core") {
			return <CoreDashboard />;
		} else {
			return null;
		}
	}

	return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        >
            <SidebarProvider>
                    <KarmaSidebar />
                    <SidebarInset>
                        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div
                                className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h-4"
                                />
                                <KarmaBreadcrumb
                                    items={[
                                        { label: "Home", href: "/" },
                                        {
                                            label: "Dashboard",
                                            href: "/dashboard",
                                            active: !tab || tab === "core",
                                        },
                                        ...(tab && tab !== "core"
                                            ? [
                                                    {
                                                        label: tab
                                                            .replace(/_/g, " ")
                                                            .replace(/\b\w/g, (c) => c.toUpperCase()),
                                                        active: true,
                                                    },
                                              ]
                                            : []),
                                    ]}
                                />
                            </div>
                        </header>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.1, ease: "easeInOut" }}
                            >
                                {renderTabComponent(tab)}
                            </motion.div>
                        </AnimatePresence>
                    </SidebarInset>
            </SidebarProvider>
        </motion.div>
	);
}
