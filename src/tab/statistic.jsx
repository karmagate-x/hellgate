import { ChartData } from "@/components/chartData";
import {KarmaGateStatistic} from "@/components/title/KarmaTitle";

export default function StatisticTab() {
	return (
        <div className={'p-4'}>
            <div className={'mb-6 -mt-2'}>
                <KarmaGateStatistic className="w-42 h-5 sm:h-7" />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
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
            <ChartData/>
        </div>
	);
}
