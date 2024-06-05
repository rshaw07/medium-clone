import {
    Pencil,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { ThreeDotsIcon } from "@/icons/ThreeDotsIcon"
import { AlertCard } from "./AlertCard"
import { useSetRecoilState } from "recoil"
import { deleteBlogAtom } from "@/atoms"
  
  export function EditMenu({blogId}:{blogId: string}) {
    const navigate = useNavigate();
    const setDelete = useSetRecoilState(deleteBlogAtom);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className=" rounded-full border-none p--1" asChild>
          <Button variant="outline">
            <ThreeDotsIcon/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" bg-white w-56">
          <DropdownMenuSeparator />
            <div className="hover:bg-gray-100">
                <DropdownMenuItem className=" cursor-pointer" onClick={() => navigate('/Edit/' + blogId)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                </DropdownMenuItem>
            </div>
            <div className="hover:bg-gray-100" onClick={() => setDelete(blogId)}>
                <div className="cursor-pointer">
                    <AlertCard/>
                </div>
            </div>
        <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  