import { Skeleton } from "./ui/skeleton"

export const MeidumBlogCardSkeleton = () => {
    return(
                <div className="p-4 border-b border-slate-200 grid grid-cols-12">
      <div className="col-span-10">
        <div className="flex pt-4 pb-2">
          <div className="flex justify-center flex-col">
            <Skeleton className=" bg-gray-200 w-10 h-10 rounded-full" />
          </div>
          <div className="pl-2 flex justify-center flex-col text-lg">
            <Skeleton className=" bg-gray-200 w-24 h-6" />
          </div>
          <div className="px-2 font-thin flex justify-center flex-col text-xs text-slate-400">
            •
          </div>
          <div className="font-thin flex justify-center flex-col text-slate-500">
            <Skeleton className=" bg-gray-200 w-20 h-6" />
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="font-bold text-xl max-w-sm py-1">
            <Skeleton className=" bg-gray-200 w-sm h-8" />
          </div>
          <div className="pt-1 text-lg max-w-lg text-slate-600">
            <Skeleton className=" bg-gray-200 w-full h-6" />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-4 flex py-4 text-sm text-slate-500">
            <Skeleton className=" bg-gray-200 w-16 h-6 mr-3 rounded-full" />
            <Skeleton className=" bg-gray-200 w-16 h-6 mr-3 rounded-full" />
            <Skeleton className=" bg-gray-200 w-8 h-6 rounded-full" />
            <div className="flex justify-center ml-2 flex-col">
              <Skeleton className=" bg-gray-200 w-24 h-6" />
            </div>
          </div>
          <div className="col-span-1 mt-4 text-slate-400 flex justify-between">
            <Skeleton className=" bg-gray-200 w-24 h-6" />
          </div>
        </div>
      </div>
      <div className="cursor-pointer flex justify-center flex-col">
        <Skeleton className=" bg-gray-200 w-24 h-24" />
      </div>
    </div>
    )
}