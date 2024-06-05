import {
    LogOut,
    User,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { UserAvatar } from "./UserAvatar";
import { userAtom } from "@/atoms";
import { useRecoilValue } from "recoil";
  
  export function ProfileCard() {
    const navigate = useNavigate();
    const user = useRecoilValue(userAtom);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className=" rounded-full border-none p--1" asChild>
          <Button variant="outline">
          <UserAvatar avatar={user.avatar}/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-white w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
            <div className="hover:bg-gray-100">
                <DropdownMenuItem className=" cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
            </div>
            <div className="hover:bg-gray-100">
                <DropdownMenuItem className="hover:bg-gray-100 cursor-pointer" onClick={() => navigate('/logout')}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  