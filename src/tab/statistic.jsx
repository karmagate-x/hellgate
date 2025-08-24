import { ChartData } from "@/components/chartData";

export default function StatisticTab() {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div className="bg-muted/50 aspect-video rounded-xl border">
					<div className="flex h-full flex-col items-center justify-center gap-2 p-4">
						<p>JANG TOTAL VISITORS</p>
					</div>
				</div>
				<div className="bg-muted/50 aspect-video rounded-xl border">
					<div className="flex h-full flex-col items-center justify-center gap-2 p-4">
						<p>JANG TOTAL HUMANS</p>
					</div>
				</div>
				<div className="bg-muted/50 aspect-video rounded-xl border">
					<div className="flex h-full flex-col items-center justify-center gap-2 p-4">
						<p>JANG TOTAL BOTS</p>
					</div>
				</div>
				<div className="bg-muted/50 aspect-video rounded-xl border">
					<div className="flex h-full flex-col items-center justify-center gap-2 p-4">
						<p>JANG TOTAL BLOCKED</p>
					</div>
				</div>
			</div>
			<ChartData />
		</div>
	);
}
