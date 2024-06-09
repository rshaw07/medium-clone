import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { CreateBlog } from './pages/CreateBlog'
import { Search } from './pages/Search'
import { Profile } from './pages/Profile'
import { Edit } from './pages/Edit'
import { RecoilRoot } from 'recoil'
import { Footer } from './components/Footer'

function App() {
  
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Signup/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/blog/:id" element={<Blog/>} />
            <Route path="/blog/:id" element={<Blog/>} />
            <Route path="/edit/:id" element={<Edit/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/createBlog" element={<CreateBlog/>} />
            <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
      </div>
    <div className='mt-auto'>
      <Footer/>
    </div>
    </div>
  )
}

export default App
