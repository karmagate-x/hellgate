"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

export const description = process.env.NEXT_PUBLIC_ORG;

const chartData = [
	{ info: "HUMANS", desktop: 222, mobile: 150 },
	{ info: "BOTS", desktop: 97, mobile: 180 },
	{ info: "BLOCKED", desktop: 167, mobile: 120 },
	{ info: "WHITELISTED IPS", desktop: 50, mobile: 120 },
	{ info: "BLACKLISTED IPS", desktop: 9, mobile: 5 },
];

const chartConfig = {
	views: {
		label: "Desktop",
	},
	desktop: {
		label: "Desktop",
		color: "var(--chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--chart-2)",
	},
};

export function ChartData() {
	const [activeChart, setActiveChart] = React.useState("desktop");

	const total = React.useMemo(
		() => ({
			desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
			mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
		}),
		[]
	);

	return (
		<Card className="py-0 h-full">
			<CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
					<CardTitle className={"text-red-700"}>
						{process.env.NEXT_PUBLIC_ORG}
					</CardTitle>
					<CardDescription>
						<i>Showing total visitors click.</i>
					</CardDescription>
				</div>
				<div className="flex">
					{["desktop", "mobile"].map((key) => {
						const chart = key;
						return (
							<button
								key={chart}
								data-active={activeChart === chart}
								className={`data-[active=true]:bg-red-700 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6${
									chart === "mobile" && activeChart === "mobile"
										? " rounded-tr-xl"
										: ""
								}`}
								onClick={() => setActiveChart(chart)}
							>
								<span className="text-xs">{chartConfig[chart].label}</span>
								<span className="text-lg leading-none font-bold sm:text-3xl">
									{total[key].toLocaleString()}
								</span>
							</button>
						);
					})}
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="info"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent className="w-[150px]" nameKey="views" />
							}
						/>
						<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
