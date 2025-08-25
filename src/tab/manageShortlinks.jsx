"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import KarmaManageShortlinksContent from "@/components/shortlinks/karmaManageShortlinksContent";
import {ManageShortlinkSkeleton} from "@/components/loading/karmaSkeleton";

export default function ManageShortlinksTab() {
    const [shortlinks, setShortlinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [message, setMessage] = useState("");
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const { user } = useUser();
    const [skeletonCount, setSkeletonCount] = useState(4);

    const fetchShortlinks = () => {
        if (!user || !user.username) return;
        setLoading(true);
        fetch(`/api/shortlinks/list?owner=${encodeURIComponent(user.username)}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.shortlinks) {
                    setSkeletonCount(data.shortlinks.length || 4);
                }
                setTimeout(() => {
                    setShortlinks(data.shortlinks || []);
                    setLoading(false);
                }, 1000);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        fetchShortlinks();
    }, [user]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your Shortlinks</h2>

            {loading ? (
                <ManageShortlinkSkeleton count={skeletonCount} />
            ) : shortlinks.length === 0 ? (
                <div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">
                    No shortlinks found.
                </div>
            ) : (
                <div className="grid gap-4">
                    {shortlinks.map((link) => (
                        <div
                            key={link._id}
                            className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80
                            shadow-md hover:shadow-xl transition-all duration-300 p-4 backdrop-blur"
                        >
                            <div className="flex flex-col mb-3">
                                <h1 className="text-zinc-800 dark:text-zinc-100 truncate overflow-hidden whitespace-nowrap max-w-[250px] lg:max-w-xl inline-block">
                                    Main URL:{" "}
                                    <span
                                        className="text-blue-700 font-semibold"
                                        title={link.firstUrl}
                                    >
                                        {link.firstUrl}
                                    </span>
                                </h1>
                                <h1 className="text-zinc-800 dark:text-zinc-100 truncate overflow-hidden whitespace-nowrap max-w-[250px] lg:max-w-xl inline-block">
                                    Backup URL:{" "}
                                    <span
                                        className={`${
                                            link.secondUrl === ""
                                                ? "text-red-700 font-semibold"
                                                : "text-green-700 font-semibold"
                                        }`}
                                    >
                                        {link.secondUrl === "" ? "Not set" : link.secondUrl}
                                  </span>
                                </h1>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                                <div>
                                    <p className="text-xs uppercase opacity-70">Created</p>
                                    <p>
                                        {link.createdAt
                                            ? new Date(link.createdAt).toLocaleString()
                                            : "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase opacity-70">Updated</p>
                                    <p>
                                        {link.updatedAt
                                            ? new Date(link.updatedAt).toLocaleString()
                                            : "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase opacity-70">Shortlink Key</p>
                                    <p>{link.shortlinkKey}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase opacity-70">Main URL Status</p>
                                    <p>{link.firstUrlStatus ?? "ACAN"}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase opacity-70">
                                        Backup URL Status
                                    </p>
                                    <p>{link.secondUrlStatus ?? "ACAN"}</p>
                                </div>
                                <KarmaManageShortlinksContent
                                    editOpen={editOpen}
                                    setEditOpen={setEditOpen}
                                    editData={editData}
                                    setEditData={setEditData}
                                    deleteData={deleteData}
                                    setDeleteData={setDeleteData}
                                    deleteOpen={deleteOpen}
                                    setDeleteOpen={setDeleteOpen}
                                    link={link}
                                    loading={loading}
                                    setLoading={setLoading}
                                    user={user}
                                    fetchShortlinks={fetchShortlinks}
                                    message={message}
                                    setMessage={setMessage}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
