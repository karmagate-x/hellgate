import { FloatingInput } from "@/components/ui/FloatingInput";
import {
	AllowedDeviceSelect,
	AllowedCountrySelect,
	BotRedirectionSelect,
} from "@/components/shortlinks/karmaShortlinkSelects";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import KarmaBackupUrlHelpDialog from "@/components/dialog/karmaBackupUrlHelpDialog";
import KarmaButtonLoading from "@/components/loading/karmaButtonLoading";

export default function CreateShortlinksTab() {
	const [form, setForm] = useState({
		owner: "",
		firstUrl: "",
		secondUrl: "",
		shortlinkKey: "",
		allowedDevice: "both",
		allowedCountry: "all",
		botRedirection: "404",
	});
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const { user } = useUser();

	useEffect(() => {
		if (user && user.username) {
			setForm((prev) => ({ ...prev, owner: user.username }));
		}
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		await toast.promise(
			(async () => {
				const res = await fetch("/api/shortlinks/create", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(form),
				});
				const data = await res.json();
				setLoading(false);
				if (res.ok) {
					setMessage(data.message);
					setForm((prev) => ({
						...prev,
						firstUrl: "",
						secondUrl: "",
						shortlinkKey: "",
						allowedDevice: "both",
						allowedCountry: "all",
						botRedirection: "404",
					}));
					return data.message;
				} else {
					setMessage(data.message || "Error");
					throw new Error(data.message || "Error");
				}
			})(),
			{
				loading: "Creating shortlink...",
				success: (message) => message,
				error: (err) => err.message || "Error",
			}
		);
	};

	return (
		<div className="flex items-center justify-center min-h-[80vh] gap-4 px-2">
			<form
				onSubmit={handleSubmit}
				className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 border rounded bg-muted/50 w-full"
			>
				<FloatingInput
					id="main-url"
					label="Main URL"
					type="url"
					value={form.firstUrl}
					onChange={(e) =>
						setForm((prev) => ({ ...prev, firstUrl: e.target.value }))
					}
					required
				/>
				<div>
					<FloatingInput
						id="backup-url"
						label="Backup URL"
						type="url"
						value={form.secondUrl}
						onChange={(e) =>
							setForm((prev) => ({ ...prev, secondUrl: e.target.value }))
						}
					/>
					<KarmaBackupUrlHelpDialog />
				</div>
				<FloatingInput
					id="shortlink-key"
					label="Shortlink Key"
					type="text"
					value={form.shortlinkKey}
					onChange={(e) =>
						setForm((prev) => ({ ...prev, shortlinkKey: e.target.value }))
					}
					required
				/>
				<AllowedDeviceSelect
					value={form.allowedDevice}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, allowedDevice: value }))
					}
				/>
				<AllowedCountrySelect
					value={form.allowedCountry}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, allowedCountry: value }))
					}
				/>
				<BotRedirectionSelect
					value={form.botRedirection}
					onChange={(value) =>
						setForm((prev) => ({ ...prev, botRedirection: value }))
					}
				/>
				<Button
					variant={"default"}
					type="submit"
					className="rounded px-4 py-2 mt-2 flex justify-center"
					disabled={loading}
				>
					{loading ? (
						<KarmaButtonLoading className={"dark:fill-black fill-white w-8 h-8"} />
					) : (
						"Create Shortlink"
					)}
				</Button>
			</form>
		</div>
	);
}
