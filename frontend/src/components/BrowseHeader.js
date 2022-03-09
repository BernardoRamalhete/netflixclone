import '../styles/BrowseHeader.css'
import Logo from '../images/netflix-logo.svg'
import user1 from '../images/user1.png'
import user2 from '../images/user2.png'
import user3 from '../images/user3.png'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {reset, logout} from '../features/auth/authSlice'

function BrowseHeader(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(logout())
    dispatch(reset())
    setTimeout(() => {navigate('/login')}, 100)
  }

  let userImage

  switch (props.profile.picture) {
    case '../images/user1.png':
      userImage = user1
    break;
    case '../images/user2.png':
      userImage = user2
    break;
    case '../images/user3.png':
      userImage = user3
    break;
    default:
      userImage = user1
}

  return (
    <header className={props.blackHeader ? 'HeaderBody HeaderBlack' : 'HeaderBody' }>
        
        <div className="header__logo">

            <a href="https://www.netflix.com" className="header__logo-link">

              <img src={Logo} alt="logo" className="header__logo-img"/>

            </a>

        </div>
        

        <div className="header__user-info">

          <div  className="header__user-logout-link">
            
                
            
          </div>

          <div className="header__user-dropdown">
                <div className="header__user-dropdown-trigger">

                  <img src={userImage} alt="user" className="header__user-dropdown-profile"/>
                  <ArrowDropUpIcon className="header__user-dropdown-icon"/>

                </div>

                <div className="header__user-dropdown-content">

                  <Link to="/profiles" className="header__user-logout header__user-dropdown-content-item "> Change profile </Link>
                  <div className="header__user-logout header__user-dropdown-content-item header__user-dropdown-content-last" onClick={onClick}> Log out </div>

                </div>
          </div>

        </div>

    </header>
  )
}

export default BrowseHeader