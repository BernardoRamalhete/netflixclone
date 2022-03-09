import RegisterHeader from '../components/RegisterHeader'
import RegisterForm from '../components/RegisterForm'
import '../styles/Register.css'

function Register() {
  return (
    <div className="RegisterBody">

      <RegisterHeader className="RegisterHeaderElement"/>

      <div className="center__container">

        <RegisterForm/>
        
      </div>

    </div>
  )
}

export default Register