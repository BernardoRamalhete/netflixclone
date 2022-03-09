import Logo from '../images/netflix-logo.svg'
import '../styles/ProfileHeader.css'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {reset, logout} from '../features/auth/authSlice'

function ProfilesHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onClick = () => {
        dispatch(logout())
        dispatch(reset())
        setTimeout(() => {navigate('/login')},100)
    }

    return (
        <>

            <div className="profiles__top__gradient" />


            <div className="profiles__header">

                <a href="http://www.netflix.com">
                    <img src={Logo} alt="logo" className="profiles__logo" />
                </a>

                <button className="profiles__logout" onClick={onClick}>
                    Log out
                </button>

            </div>

        </>
    )
}

export default ProfilesHeader