import { Button } from "@/components/ui/button";
import {
	AllowedDeviceSelect,
	AllowedCountrySelect,
	BotRedirectionSelect,
} from "@/components/shortlinks/karmaShortlinkSelects";
import { FloatingInput } from "@/components/ui/FloatingInput";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogFooter,
	AlertDialogAction,
	AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function KarmaManageShortlinksContent({
	editOpen,
	setEditOpen,
	editData,
	setEditData,
	deleteData,
	setDeleteData,
	deleteOpen,
	setDeleteOpen,
	user,
	link,
	loading,
	setLoading,
	fetchShortlinks,
	setMessage,
}) {
	const handleDelete = (link) => {
		setDeleteData({ ...link });
		setDeleteOpen(true);
	};

	const handleDeleteConfirm = async () => {
		if (!deleteData) return;
		await toast.promise(
			(async () => {
				const res = await fetch("/api/shortlinks/delete", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						shortlinkKey: deleteData.shortlinkKey,
						owner: user.username,
					}),
				});
				const data = await res.json();
				if (res.ok) {
					setDeleteOpen(false);
					setDeleteData(null);
					fetchShortlinks();
					return data.message;
				} else {
					throw new Error(data.message || "Failed to delete shortlink");
				}
			})(),
			{
				loading: "Deleting shortlink...",
				success: (message) => message,
				error: (err) => err.message || "Error",
			}
		);
	};

	const handleEdit = (link) => {
		setEditData({ ...link });
		setEditOpen(true);
	};

	const handleEditChange = (field, value) => {
		setEditData((prev) => ({ ...prev, [field]: value }));
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		if (!editData) return;
		await toast.promise(
			(async () => {
				const payload = {
					...editData,
					owner: user.username,
					originalShortlinkKey: link.shortlinkKey,
				};
				const res = await fetch("/api/shortlinks/manage", {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload),
				});
				const data = await res.json();
				setLoading(false);
				if (res.ok) {
					setEditOpen(false);
					setEditData(null);
					fetchShortlinks();
					return data.message;
				} else {
					setMessage(data.message || "Error");
					throw new Error(data.message || "Error");
				}
			})(),
			{
				loading: "Updating shortlink...",
				success: (message) => message,
				error: (err) => err.message || "Error",
			}
		);
	};
	return (
		<div className="flex items-center lg:justify-end gap-2 mt-5 lg:mt-0">
			<AlertDialog
				open={editOpen && editData?._id === link._id}
				onOpenChange={setEditOpen}
			>
				<AlertDialogTrigger asChild>
					<Button size="sm" variant="outline" onClick={() => handleEdit(link)}>
						Edit
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Edit Shortlink</AlertDialogTitle>
					</AlertDialogHeader>
					{editData && (
						<form onSubmit={handleEditSubmit} className="space-y-2 mt-2">
							<FloatingInput
								id="edit-main-url"
								label="Main URL"
								type="url"
								value={editData.firstUrl || ""}
								onChange={(e) => handleEditChange("firstUrl", e.target.value)}
								required
							/>
							<FloatingInput
								id="edit-backup-url"
								label="Backup URL"
								type="url"
								value={editData.secondUrl || ""}
								onChange={(e) => handleEditChange("secondUrl", e.target.value)}
							/>
							<FloatingInput
								id="edit-shortlinkkey"
								label="Shortlink Key"
								type="text"
								value={editData.shortlinkKey || ""}
								onChange={(e) =>
									handleEditChange("shortlinkKey", e.target.value)
								}
								required
							/>
							<AllowedDeviceSelect
								value={editData.allowedDevice || "both"}
								onChange={(value) => handleEditChange("allowedDevice", value)}
							/>
							<AllowedCountrySelect
								value={editData.allowedCountry || "all"}
								onChange={(value) => handleEditChange("allowedCountry", value)}
							/>
							<BotRedirectionSelect
								value={editData.botRedirection || "404"}
								onChange={(value) => handleEditChange("botRedirection", value)}
							/>
							<AlertDialogFooter>
								<AlertDialogCancel type="button">Cancel</AlertDialogCancel>
								<AlertDialogAction asChild>
									<Button type="submit">
										{loading ? (
											<KarmaLoading className={"w-8 h-8"} />
										) : (
											"Update"
										)}
									</Button>
								</AlertDialogAction>
							</AlertDialogFooter>
						</form>
					)}
				</AlertDialogContent>
			</AlertDialog>
			<AlertDialog
				open={deleteOpen && deleteData?._id === link._id}
				onOpenChange={setDeleteOpen}
			>
				<AlertDialogTrigger asChild>
					<Button
						size="sm"
						variant="destructive"
						onClick={() => handleDelete(link)}
					>
						Delete
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete {link.firstUrl} ?</AlertDialogTitle>
					</AlertDialogHeader>
					<div>
						Are you sure you want to delete this shortlink? This action cannot
						be undone.
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel type="button">Cancel</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button
								type="button"
								variant="destructive"
								onClick={handleDeleteConfirm}
							>
								Delete
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
