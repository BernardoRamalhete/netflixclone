import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './styles/Toast.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Browse from './pages/Browse'
import Profiles from './pages/Profiles'
import ManageProfiles from './pages/ManageProfiles'
import AddProfile from './pages/AddProfile'
import EditProfile from './pages/EditProfile'



function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/browse' element={<Browse/>}/>
            <Route path='/profiles' element={<Profiles/>}/>
            <Route path='/profiles/manage' element={<ManageProfiles/>}/>
            <Route path='/profiles/add' element={<AddProfile/>}/>
            <Route path='/profile/edit' element={<EditProfile/>}/>
          </Routes>
        </Router>
        <ToastContainer className='toast__error'/>
    </>
  );
}

export default App;
