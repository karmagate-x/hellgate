"use client";

import { ChevronRight } from "lucide-react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavMain({ items }) {
	const router = useRouter();
	return (
		<SidebarGroup>
			<SidebarGroupLabel>
				<h1
					onClick={() => router.push("/dashboard?tab=core")}
					className={
						"text-red-700 animate-pulse font-semibold text-sm mb-2 cursor-pointer"
					}
				>
					{process.env.NEXT_PUBLIC_ORG}
				</h1>
			</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton tooltip={item.title}>
									{item.icon && (
										<item.icon
											className={
												item.icon?.displayName.toLowerCase() === "link"
													? "text-blue-600"
													: item.icon?.displayName.toLowerCase() === "bot"
													? "text-red-600"
													: item.icon?.displayName.toLowerCase() === "activity"
													? "text-amber-600"
													: "text-cyan-600"
											}
										/>
									)}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton asChild>
												<p
													onClick={() => router.push(subItem.url)}
													className="cursor-pointer transition duration-150"
												>
													<span className="text-violet-800 font-bold">*</span>
													<span>{subItem.title}</span>
												</p>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</CollapsibleContent>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
