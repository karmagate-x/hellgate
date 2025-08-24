"use client";
import { useRouter } from "next/navigation";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function KarmaBreadcrumb({ items }) {
	const router = useRouter();

	const goTo = (href) => {
		if (href) router.push(href);
	};

	return (
		<div className="p-5">
			<Breadcrumb>
				<BreadcrumbList>
					{items.map((item, idx) => (
						<span key={"bc-" + idx} className="flex items-center">
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<p
										onClick={item.href ? () => goTo(item.href) : undefined}
										className={`cursor-pointer ${
											item.active ? "font-semibold text-red-700/80" : ""
										}`}
									>
										{item.label}
									</p>
								</BreadcrumbLink>
							</BreadcrumbItem>
							{idx < items.length - 1 && <BreadcrumbSeparator />}
						</span>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}
