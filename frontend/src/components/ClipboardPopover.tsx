import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Clipboard } from "@/icons/ClipboardIcon";
import { useState } from "react";


export function ClipboardPopover({blogId}:{blogId: string}) {

  const [flag, setFlag] = useState(false);

  function onClickHandle(){
    setFlag(true);
    setTimeout(() => {
      setFlag(false);
    }, 2000);
  };

    return (
      <Popover open={flag} onOpenChange={setFlag}>
        <PopoverTrigger>
          <div onClick={onClickHandle}>
            <Clipboard blogId={blogId}/>
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" className="flex justify-center flex-col rounded bg-black w-fit h-8 text-white text-xs " >
          Link Copied.
        </PopoverContent>
      </Popover>
    );
}