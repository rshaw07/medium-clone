import axios from "axios"
import { atom, selector } from "recoil"
import { BACKEND_URL } from "./config";
import moment from "moment";

export const allBlogAtom = atom({
    key: "allBlogAtom",
    default: selector({
        key: "allBlogSelector",
        get: async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                },
            })
            return response.data.blogs.map((blog:any) => {
                const x = moment(blog.published).format("MMMM DD, YYYY");
                return {...blog, published: x}
            });
        }
    })
})


export const homepageBlogSelector = selector({
    key: "homepageBlogSelector",
    get: ({get}) => {
        const blogs = get(allBlogAtom);
        return blogs.filter((blog:any) => blog.draft === false);
    }
})


export const profileHomeBlogSelector = selector({
    key: "profileHomeBlogSelector",
    get: ({get}) => {
        const blogs = get(allBlogAtom);
        const user = get(userAtom);
        return blogs.filter((blog:any) => blog.author.id === user.id);
    }    
})

export const urlAtom = atom({
    key: "urlAtom",
    default: ""
})

export const userAtom = atom({
    key: "userAtom",
    default: {}
})

export const bookmarkAtom = atom({
    key: "bookmarkAtom",
    default: selector({
        key: "bookmarkSelector",
        get: async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/bookmark`, {
                headers: {
                    "Authorization" : localStorage.getItem("token")
                },
            })
            return response.data.bookmarks.map((bookmark:any) => bookmark.blogId);
        }
    })
})

export const bookmarkedBlogsSelector = selector({
    key: "bookmarkedBlogsSelector",
    get: ({get}) => {
        const bookmarks = get(bookmarkAtom);
        const allBlogs = get(allBlogAtom);
        return allBlogs.filter((blog:any) => bookmarks.includes(blog.id));
    }
})

export const deleteBlogAtom = atom({
    key: "deleteBlogAtom",
    default:""
})

export const likeAtom = atom({
    key: "likeAtom",
    default: 0
})