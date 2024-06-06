import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Spinner } from "@/icons/Spinner"
  
  export function UserAvatar({avatar}:{avatar: string}) {
    return (
      <Avatar>
        <AvatarImage src={avatar} alt="@shadcn" />
        <AvatarFallback><Spinner /></AvatarFallback>
      </Avatar>
    )
  }
  