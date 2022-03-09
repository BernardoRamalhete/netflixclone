import '../styles/ProfileAdd.css'
import user1 from '../../build/media/user1.png'
import user2 from '../images/user2.png'
import user3 from '../images/user3.png'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createProfile} from '../features/profiles/profileSlice'

function ProfileAdd() {

    const [checkedUser1, setCheckedUser1] = useState(true)
    const [checkedUser2, setCheckedUser2] = useState(false)
    const [checkedUser3, setCheckedUser3] = useState(false)
    
    const [nameInput, setNameInput] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChangeUser1 = () => {
        if(!checkedUser1) {
            setCheckedUser1(!checkedUser1)
            setCheckedUser2(false)
            setCheckedUser3(false)
        }
    }

    const onChangeUser2 = () => {
        if(!checkedUser2) {
            setCheckedUser2(!checkedUser2)
            setCheckedUser1(false)
            setCheckedUser3(false)
        }
    }

    const onChangeUser3 = () => {
        if(!checkedUser3) {
            setCheckedUser3(!checkedUser3)
            setCheckedUser1(false)
            setCheckedUser2(false)
        }
    }

    const onNameChange = (event) => {
        setNameInput(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()


        let userPhoto
        const profileName = event.target[3].value

        if(event.target[0].checked) {
            userPhoto = '../images/user1.png'
        }

        if(event.target[1].checked) {
            userPhoto = '../images/user2.png'
        }

        if(event.target[2].checked) {
            userPhoto = '../images/user3.png'
        }

        dispatch(createProfile({profileName, userPhoto}))
        
        setTimeout(navigate('/profiles'), 100)
    }

    

  return (
    <div className="profile__add__center">

        <div className="profile__edit__container">
            <h2 className="profile__add__title">Add new profile</h2>
            <hr className="profile__add__hr"/>
        
            <form onSubmit={onSubmit}>

                    <div className="profile__add__image-selector">

                        <label forHtml="image__choice1" className="profile__add__input-label">
                            <input type="radio" id="image__choice1" name="image__selector" value="user1" checked={checkedUser1} onChange={onChangeUser1}/>
                            <img src={user1} alt="user1" className={checkedUser1 ? "profile__add__image-selected" : "profile__add__image"} onClick={onChangeUser1}/>
                        </label>                    
                        
                        <label forHtml="image__choice2" className="profile__add__input-label">
                            <input type="radio" id="image__choice2" name="image__selector" value="user2" checked={checkedUser2} onChange={onChangeUser2}/>
                            <img src={user2} alt="user2" className={checkedUser2 ? "profile__add__image-selected" : "profile__add__image"} onClick={onChangeUser2}/>
                        </label>                    
                        
                        <label forHtml="image__choice3" className="profile__add__input-label">
                            <input type="radio" id="image__choice3" name="image__selector" value="user3" checked={checkedUser3} onChange={onChangeUser3}/>
                            <img src={user3} alt="user3" className={checkedUser3 ? "profile__add__image-selected" : "profile__add__image"}  onClick={onChangeUser3}/>
                        </label>                    
                        
                    </div>

                    <label forHtml="name" className="profile__add__name-label">
                        Name
                        <input type="text" id="name" name="name" className="profile__add__name-input" value={nameInput} onChange={onNameChange} placeholder="Profile name"/>
                    </label>

                    <hr className="profile__add__hr"/>

                        
                            <div className="profile__add__buttoms-container">

                                <button type="submit" className="profile__add__save-buttom">Save</button>

                                <Link to="/profiles" >
                                        <button className="profile__add__cancel-buttom">Cancel</button>
                                    
                                </Link>

                            </div>

            </form>
            
        </div>


    </div>
  )
}

export default ProfileAdd