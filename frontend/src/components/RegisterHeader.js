import '../styles/RegisterHeader.css'
import Logo from '../images/netflix-logo.svg'
import {Link} from 'react-router-dom'

function RegisterHeader() {
  return (
    <>
      <div className="HeaderBody">

        <a className="logoHeader" href="https://www.netflix.com/" target="_blank" rel="noreferrer">
                <img src={Logo} alt="logo"/>
        </a>

        <Link to="/login" className="signInHeader" >Sign In</Link>

      </div>

      <hr className="hrHeader"/>
    </>
  )
}

export default RegisterHeader