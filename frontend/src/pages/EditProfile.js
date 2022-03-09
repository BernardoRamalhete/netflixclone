import ProfilesHeader from '../components/ProfilesHeader'
import ProfileEdit from '../components/ProfileEdit'
import '../styles/Profiles.css'
import {useLocation} from 'react-router-dom'

function EditProfile() {

    const location = useLocation()
    
    const {profile} = location.state

  return (
    <div className= 'ProfilesBody'>
        <ProfilesHeader/>
        <ProfileEdit toEdit={profile}/>
    </div>
  )
}

export default EditProfile