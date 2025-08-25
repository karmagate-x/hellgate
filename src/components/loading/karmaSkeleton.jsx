import {Skeleton} from "@/components/ui/skeleton";
import * as React from "react";

function ManageShortlinkSkeleton({ count = 3 }) {
    return (
        <>
            <div className="flex flex-col -mt-2 mb-7 space-y-2">
                <Skeleton className="h-10 w-[260px] sm:h-10 sm:w-[270px]" />
            </div>
            <div className="grid gap-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80
                                shadow-md p-4 backdrop-blur"
                    >
                        <div className="flex flex-col mb-3 space-y-2">
                            <Skeleton className="h-[22px] w-2/3" />
                            <Skeleton className="h-[22px] w-1/2" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <div key={j} className="space-y-1">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-22" />
                                </div>
                            ))}
                            <div className={'flex items-center lg:justify-end gap-2 mt-5 lg:mt-0'}>
                                <Skeleton className="h-8 w-16 rounded-md" />
                                <Skeleton className="h-8 w-18 rounded-md" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

function ApiKeySkeleton() {
    return (
        <>
            <Skeleton className="h-4 w-full sm:w-[300px] rounded-sm" />
            <Skeleton className="h-6 w-6 rounded-md" />
        </>
    )
}

export {ManageShortlinkSkeleton, ApiKeySkeleton};