import '../styles/Profiles.css'
import newprofile from '../images/addnewprofile.png'
import ProfilesHeader from '../components/ProfilesHeader'
import {getProfiles, reset} from '../features/profiles/profileSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, Link} from 'react-router-dom'
import {useEffect} from 'react'
import {toast} from 'react-toastify'
import Profile from '../components/Profile'
import Spinner from '../components/Spinner'

function Profiles() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth)
  const {profiles, isLoading, isError, message} = useSelector((state) => state.profiles)
  let firstRender = true;

  useEffect(() => {
    if(user.user == null) {
      
      navigate('/login')
      
    }
  }, [user, navigate])

  useEffect(() => {
    if(isError) {
        toast.error(message)
    }

   dispatch(getProfiles())
   firstRender = false;

    return () => {
        dispatch(reset())
    }
}, [isError, message, dispatch])

  useEffect(() => {

  }, [firstRender])

  if(isLoading) {
    return <Spinner imgSrc="https://www.rchandru.com/images/portfolio/loading.gif" bgColor="#000"/>
}

  return (
      <div className="ProfilesBody">
      
        <ProfilesHeader/>        
        <div className="profiles__conteiner">

          <div className="center__group">

                  <h2 className="profiles__text">Who's watching?</h2>

                  <div className="profiles__group">

                      {profiles.map((profile) => 
                          
                          <Profile key={profile._id} profile={profile}/>

                      )}
                      
                      <div className="profile__item">
                          <Link to="/profiles/add" className="profile__link">
                              <img src={newprofile} alt="user2" className="profile__picture" />
                              <p className="profile__name">Add new profile</p>
                          </Link>
                      </div>

                  </div>


              </div>
              <Link to="/profiles/manage" className="profile__button">
                  <button className="profiles__manage__button">MANAGE PROFILES</button>
              </Link>

              
        </div>
      </div>
  )
}

export default Profiles