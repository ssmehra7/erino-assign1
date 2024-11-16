import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import Landing from "./pages/Landing"
import CreateContact from "./pages/CreateContact"




function App() {
 

  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element ={<Landing/>}/>
            <Route path="/signin" element ={<Signin/>}/>
            <Route path="/signup" element = {<Signup/>}/>
            <Route path= "/profile" element ={<Profile/>}/>
            <Route path = "/dashboard" element = {<Dashboard/>}/>
            <Route path = "/create" element = {<CreateContact/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
