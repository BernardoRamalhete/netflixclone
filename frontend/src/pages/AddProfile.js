import ProfilesHeader from '../components/ProfilesHeader'
import ProfileAdd from '../components/ProfileAdd'
import '../styles/Profiles.css'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

function AddProfile() {

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth)

  useEffect(() => {
    if(user.user == null) {
      
      navigate('/login')
      
    }
  }, [user, navigate])

  return (
    <div className="ProfilesBody">
        <ProfilesHeader/>
        <ProfileAdd/>
    </div>
  )
}

export default AddProfile