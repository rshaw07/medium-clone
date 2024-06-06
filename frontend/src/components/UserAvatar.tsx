import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Skeleton } from "./ui/skeleton"
  
  export function UserAvatar({avatar}:{avatar: string}) {
    return (
      <Avatar>
        <AvatarImage src={avatar} alt="@shadcn" />
        <AvatarFallback><Skeleton className=" bg-gray-200 w-10 h-10 rounded-full" /></AvatarFallback>
      </Avatar>
    )
  }
  