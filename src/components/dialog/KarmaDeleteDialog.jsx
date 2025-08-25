import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import KarmaLoading from "@/components/loading/karmaLoading";

export function KarmaDeleteDialog({
	open,
	onOpenChange,
	onConfirm,
	loading,
	firstUrl,
}) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {firstUrl}</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this shortlink? This action cannot
						be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel type="button">Cancel</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button
							type="button"
							variant="destructive"
							onClick={onConfirm}
							disabled={loading}
						>
							{loading ? <KarmaLoading className={"w-8 h-8"} /> : "Delete"}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
