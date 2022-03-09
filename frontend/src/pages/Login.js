import '../styles/Login.css'
import Logo from '../images/netflix-logo.svg'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'

function Login () {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [isEmpty, setIsEmpty] = useState({
        email: true,
        password: true
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/profiles')
        }

        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (event) => {
        if(event.target.value !== '') {
            setIsEmpty((prevState) => ({
                    ...prevState,
                    [event.target.name]: false
            }))
        } else {
            setIsEmpty((prevState) => ({
                ...prevState,
                [event.target.name]: true
        }))
        }
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner imgSrc='https://www.rchandru.com/images/portfolio/loading.gif' bgColor='#000'/>
    }

    return (
    <div className="LoginBody">
        <a className="logo" href="https://www.netflix.com/" target="_blank" rel="noreferrer">
            <img src={Logo} alt="logo"/>
        </a>

        <div className="login">
            
            <h1 className="login__title">Sign In</h1>
            
            <form onSubmit={onSubmit}>
            <div className="login__group">
                <input className="login__group__input" type="email" name="email" id="email"  value={email} onChange={onChange}/>
                <label className={isEmpty.email ? "login__group__label" : "login__group__label-filled"}>Email</label>
            </div>
            
            <div className="login__group">
                <input className="login__group__input" type="password" id="password" name="password" value={password} onChange={onChange} />
                <label className={isEmpty.password ? "login__group__label" : "login__group__label-filled"}>Password</label>
            </div>
            
            <button className="login__sign-in" type="submit" onSubmit={onSubmit}>Sign In</button>
            
            <div className="login__secondary-cta">
                
                <a className="login__secondary-cta__text" href="https://www.netflix.com/br/LoginHelp">Need help?</a>

            </div>

            </form>
            


            <div className="login__secondary-cta">
            <span className="login__secondary-cta__text--register">New to Netflix?<Link to="/register" className="login__secondary-cta__link" >Sign up now</Link></span>
            </div>

        </div>
    </div>
    )
}



export default Login