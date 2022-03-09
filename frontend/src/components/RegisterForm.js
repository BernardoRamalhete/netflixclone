import '../styles/RegisterForm.css'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function RegisterForm() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [isEmpty, setIsEmpty] = useState({
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        confirmPassword: true
    })

    const {firstname, lastname, email, password, confirmPassword} = formData

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
    }, [user, isError, isSuccess, message, navigate, dispatch])

    
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

        if(password !== confirmPassword) {
            toast.error("Passwords don't match")
        } else {
            const userData = {
                firstname,
                lastname,
                email,
                password
            }

            dispatch(register(userData))
        }
    }

        if(isLoading) {
            return <Spinner imgSrc="https://i.gifer.com/5KCW.gif" bgColor="#fff"/>
        }


    return (
        <>
            <div className="register">

                <section className="register__text">

                    <h2 className="register__title">Create a account to start your membership</h2>
                    <p className="register__paragraph">Just give us a few more information and you're done!</p>
                    <p className="register__paragraph">We hate paperwork, too.</p>

                </section>

                <form className="register__form" onSubmit={onSubmit}>

                    <div className="register__group">
                        <input type="text" name="firstname" id="firstname" className="register__input" value={firstname} onChange={onChange}/>
                        <label className={isEmpty.firstname ? "register__label" : "register__label-filled"}>First Name</label>
                    </div>

                    <div className="register__group">
                        <input type="text" name="lastname" id="lastname" className="register__input" value={lastname} onChange={onChange}/>
                        <label className={isEmpty.lastname ? "register__label" : "register__label-filled"}>Last Name</label>
                    </div>

                    <div className="register__group">
                        <input type="email" name="email" id="email" className="register__input" value={email} onChange={onChange}/>
                        <label className={isEmpty.email ? "register__label" : "register__label-filled"}>Email</label>
                    </div>

                    <div className="register__group">
                        <input type="password" name="password" id="password" className="register__input" value={password} onChange={onChange}/>
                        <label className={isEmpty.password ? "register__label" : "register__label-filled"}>Password</label>
                    </div>

                    <div className="register__group">
                        <input type="password" name="confirmPassword" id="confirmPassword" className="register__input" value={confirmPassword} onChange={onChange}/>
                        <label className={isEmpty.confirmPassword ? "register__label" : "register__label-filled"}>Confirm Password</label>
                    </div>

                    <button className="register__submit" type="submit">Register</button>

                </form>

            </div>
        </>
    )
}

export default RegisterForm