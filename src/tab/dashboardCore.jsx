import {KarmaDashboardCoreWelcome} from "@/components/title/KarmaTitle";

export default function CoreDashboard() {
	return (
		<div className="flex items-center justify-center text-center mx-auto min-h-[80vh]">
			<KarmaDashboardCoreWelcome className="w-32 h-5 sm:w-62 sm:h-7 mr-30 sm:mr-50"/>
		</div>
	);
}
