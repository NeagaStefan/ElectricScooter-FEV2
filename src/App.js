import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React  from 'react'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import History from "./pages/History";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Admin from './pages/Admin'
import CreateNewScooter from "./components/CreateNewScooter";
import UpdateScooterComponent from "./components/UpdateScooterComponent";
import UpdateUserComponent from "./components/UpdateUserComponent";


function App() {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 600);

  return (
      <>
          <Router>
              <Routes>
                  <Route path ='/' element={<Explore expiryTimestamp={time}/>}/>
                  <Route path ='/history' element={<History itemsPerPage={10}/>}/>
                  <Route path ="/profile" element={<Profile/>}/>
                  <Route path ='/sign-in' element={<SignIn/>}/>
                  <Route path ='/sign-up' element={<SignUp/>}/>
                  <Route path ='/admin' element={<Admin/>}/>
                  <Route path ='/edit' element={<Admin/>}/>
                  <Route path ='/forgot-password' element={<ForgotPassword/>}/>
                  <Route path= "/scooter" element={<CreateNewScooter/>}/>
                  <Route path= "/scooter/edit" element={ <UpdateScooterComponent />}/>
                  <Route path= "/user/:customerId" element={<UpdateUserComponent/>} />
                  {/*element={<UpdateScooterComponent/>}*/}
              </Routes>
              <Navbar/>
          </Router>
          <ToastContainer/>

    </>
  );
}

export default App;
