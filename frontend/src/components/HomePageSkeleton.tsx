import { Skeleton } from "@/components/ui/skeleton"

 export const HomePageSkeleton = () => {
  return (
    <div className="p-4 px-60 border-b grid grid-cols-9 border-slate-200">
      <div className="max-w-2xl col-span-7">
        <div className="flex pt-4 pb-2">
          <div className="flex justify-center flex-col">
            <Skeleton className=" bg-slate-300 w-10 h-10 rounded-full" />
          </div>
          <div className="pl-2 flex justify-center flex-col text-lg">
            <Skeleton className=" bg-slate-300 w-32 h-6" />
          </div>
          <div className="px-2 font-thin flex justify-center flex-col text-xs text-slate-300">
            •
          </div>
          <div className="font-thin flex justify-center flex-col text-slate-500">
            <Skeleton className=" bg-slate-300 w-20 h-4" />
          </div>
        </div>
        <div className="cursor-pointer">
          <div className="font-bold text-xl py-1">
            <Skeleton className=" bg-slate-300 w-full h-8" />
          </div>
          <div className="pt-1 text-lg text-slate-600">
            <Skeleton className=" bg-slate-300 w-full h-6" />
            <Skeleton className=" bg-slate-300 w-full h-6 mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-6">
          <div className="col-span-4 flex py-4 text-sm text-slate-500">
            <Skeleton className=" bg-slate-300 w-16 h-6 mr-3 rounded-full" />
            <Skeleton className=" bg-slate-300 w-16 h-6 rounded-full" />
            
            <div className="flex justify-center ml-2 flex-col">
              <Skeleton className=" bg-slate-300 w-24 h-6" />
            </div>
          </div>
          <div className="col-span-1 text-slate-300 flex justify-evenly">
            <div className="flex justify-center flex-col">
              <Skeleton className=" bg-slate-300 w-6 h-6" />
            </div>
            <div className="flex justify-center flex-col">
              <Skeleton className=" bg-slate-300 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="cursor-pointer flex col-span-2 justify-center flex-col">
        <Skeleton className=" bg-slate-300 w-full h-48" />
      </div>
    </div>
  );
};
