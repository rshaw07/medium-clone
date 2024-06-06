import { AppBar } from "./AppBar"
import { MeidumBlogCardSkeleton } from "./MediumBlogCardSkeleton"
// import { HomePageSkeleton } from "./HomePageSkeleton"
import { Skeleton } from "./ui/skeleton"

export const ProfilePageSkeleton = () => {
    return (
        <div>
            <AppBar/>
            <div className="grid grid-cols-8">
                <div className="col-span-1"></div>
                <div className="col-span-4 border-r border-slate-200">
                <Skeleton className=" bg-gray-200 mt-10 mb-5 w-56 h-11 " />

                <div className="flex">
                    <Skeleton className=" bg-gray-200 w-10 h-4 mr-14" />
                    <Skeleton className=" bg-gray-200 w-10 h-4 " />
                </div>

                    <div className="border-t border-slate-200">
                        <div className="flex my-5 justify-center">
                            <Skeleton className=" bg-gray-200 w-20 h-4 mr-14" />
                            <Skeleton className="bg-gray-200 w-11 h-4 " />
                        </div>
                        <MeidumBlogCardSkeleton/>
                        <MeidumBlogCardSkeleton/>
                    </div>
                </div>
                <div className="col-span-3 p-10">
                    <Skeleton className=" bg-gray-200 w-10 h-10 rounded-full" />
                    <Skeleton className=" bg-gray-200 mt-5 w-20 h-4 " />
                    <Skeleton className=" bg-gray-200 my-2 w-20 h-4 " />
                    <Skeleton className=" bg-gray-200 my-3 w-20 h-8 " />
                </div>
            </div>
        </div>
    )
} 