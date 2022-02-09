import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/common/Nav'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Error from './components/common/Error'
import Loading from './components/common/Loading'
import ProjectShow from './components/projects/ProjectShow'
import ProjectIndex from './components/projects/ProjectIndex'
import AddProject from './components/projects/AddProjects'
import ProjectEdit from './components/projects/ProjectEdit'
import Favourites from './components/projects/Favourites'
import About from './components/common/About'

function App() {
  return (
    <BrowserRouter> 
      <Nav />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = "/favourites" element = {<Favourites />} />
        <Route path = "/projects" element = {<ProjectIndex />} />
        <Route path = "/projects/:projectId" element = {<ProjectShow />} />   
        <Route path = "/projects/create" element = {<AddProject />} />
        <Route path = "/projects/:projectId/edit" element = {<ProjectEdit />} />  
        <Route path = '/error' element = {<Error />} />
        <Route path = '/loading' element = {<Loading />} />
        <Route path = '/about' element = {<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
