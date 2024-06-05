import { Skeleton } from "./ui/skeleton";

export const SingleBlogSkeleton = () => {
    return (
        <div className="flex justify-center">
            <div className="w-[55dvw]">
                <div className="mt-16 text-3xl">
                    <Skeleton className=" bg-slate-300 w-full h-10" />
                </div>
                <div className="flex mt-9">
                    <Skeleton className=" bg-slate-300 w-16 h-16 rounded-full" />
                    <div className="ml-6">
                        <div className="text-2xl">
                            <Skeleton className=" bg-slate-300 w-48 h-6 my-1" />
                        </div>
                        <div className="grid grid-cols-2 my-1 gap-4">
                            <div>
                                <Skeleton className=" bg-slate-300 w-32 h-6" />
                            </div>
                            <div>
                                <Skeleton className=" bg-slate-300 w-32 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <Skeleton className=" bg-slate-300 w-full h-12 mt-6" />
                <div className="flex justify-center flex-col mt-4">
                    <Skeleton className=" bg-slate-300 w-full h-64" />
                </div>
                <div className="my-6 leading-loose text-xl text-gray-700">
                    <Skeleton className=" bg-slate-300 w-full h-6 mb-4" />
                    <Skeleton className=" bg-slate-300 w-full h-6 mb-4" />
                    <Skeleton className=" bg-slate-300 w-full h-6 mb-4" />
                    <Skeleton className=" bg-slate-300 w-full h-6 mb-4" />
                    <Skeleton className=" bg-slate-300 w-full h-6 mb-4" />
                </div>
                <div className="flex my-6">
                    <Skeleton className=" bg-slate-300 w-20 h-8 mr-3 rounded-full" />
                    <Skeleton className=" bg-slate-300 w-20 h-8 mr-3 rounded-full" />
                    <Skeleton className=" bg-slate-300 w-20 h-8 mr-3 rounded-full" />
                </div>
                <Skeleton className=" bg-slate-300 w-full h-12 mt-6" />
                <div className="bg-slate-100 p-4 rounded-xl">
                    <Skeleton className=" bg-slate-300 w-16 h-16 rounded-full" />
                    <div className="mt-2 text-2xl">
                        <Skeleton className=" bg-slate-300 w-48 h-8" />
                    </div>
                    <div className="mt-2">
                        <Skeleton className=" bg-slate-300 w-full h-6" />
                        <Skeleton className=" bg-slate-300 w-full h-6 mt-2" />
                        <Skeleton className=" bg-slate-300 w-full h-6 mt-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}