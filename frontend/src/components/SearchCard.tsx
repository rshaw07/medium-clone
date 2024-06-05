
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search } from './AppBar';
import { SmallBlogCard } from './SmallBlogCard';
import { SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { homepageBlogSelector } from '@/atoms';
import { DialogClose } from '@radix-ui/react-dialog';

const SearchDialog = () => {

    const[filter, setFilter] = useState("");
    const dialogTriggerRef = useRef<HTMLButtonElement | null>(null);
    const[open, setOpen] = useState(false);
    const blogs = useRecoilValue(homepageBlogSelector);
    const[dummyBlog, setDummyBlog] = useState([]);
    // const dummyBlog = blogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()) || blog.content.toLowerCase().includes(filter.toLowerCase()))

   useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        if (dialogTriggerRef.current) {
          dialogTriggerRef.current.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
      if(open){
          setFilter("");
          setDummyBlog(blogs);
      }
  },[open,blogs])

  useEffect(() => {
    setDummyBlog(blogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()) || blog.content.toLowerCase().includes(filter.toLowerCase())))
  },[filter, blogs])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="rounded-full border-none p--2" asChild>
        <Button variant="outline" ref={dialogTriggerRef}>
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className=" bg-white max-w-2xl grid-rows-[auto_minmax(0,1fr)_auto] p-0 h-[70dvh]">
        <DialogHeader className=" pb-0 border-b border-gray-300">
          <form className="w-full">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <div className="pl-2">
                <input
                  className="block w-full outline-none p-4 ps-10 text-sm text-gray-900 rounded-lg"
                  placeholder="Search"
                  onChange={(e) => setFilter(e.target.value)}
                />
              </div>
            </div>
          </form>
        </DialogHeader>
        <div className="grid gap-4 overflow-y-auto px-6">
          <DialogClose asChild>
            <div className="">
              {dummyBlog.map((blog) => {
                return <SmallBlogCard blog={blog} />;
              })}
            </div>
            </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
