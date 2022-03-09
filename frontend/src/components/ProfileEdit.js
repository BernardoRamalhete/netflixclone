import '../styles/ProfileEdit.css'
import user1 from '../images/user1.png'
import user2 from '../images/user2.png'
import user3 from '../images/user3.png'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {editProfile} from '../features/profiles/profileSlice'
import {useState, useEffect} from 'react'

function ProfileEdit(props) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const profile = props.toEdit

    const [checkedUser1, setCheckedUser1] = useState(true)
    const [checkedUser2, setCheckedUser2] = useState(false)
    const [checkedUser3, setCheckedUser3] = useState(false)

    const [profileName, setProfileName] = useState(profile.name)

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

    const handleNameChange = (event) => {
        setProfileName(event.target.value)
    }

    useEffect(()=> {
        switch(profile.picture) {
            case '../images/user1.png':
                onChangeUser1()
            break;
            case '../images/user2.png':
                onChangeUser2()
            break;
            case '../images/user3.png':
                onChangeUser3()
            break;
            default:
                onChangeUser1()
    
        }
    }, [])


    const onSubmit = (event) => {
        event.preventDefault()

        const profileId = profile._id

        let newPicture

        const newName = event.target[3].value

        if(event.target[0].checked) {
            newPicture = '../images/user1.png'
        }

        if(event.target[1].checked) {
            newPicture = '../images/user2.png'
        }

        if(event.target[2].checked) {
            newPicture = '../images/user3.png'
        }

        dispatch(editProfile({newName, newPicture, profileId}))

        setTimeout(navigate('/profiles/manage'), 100)
    }

  return (
    <div className="profile__edit__center">

        <div className="profile__edit__container">

            <h2 className="profile__edit__title">Edit profile</h2>
            <hr className="profile__edit__hr"/>

            <form onSubmit={onSubmit}>

                <div className="profile__edit__image-selector">

                    <label forHtml="image__choice1" className="profile__edit__input-label">
                        <input type="radio" id="image__choice1" name="image__selector" value="user1" checked={checkedUser1} onChange={onChangeUser1}/>
                        <img src={user1} alt="user1" className={checkedUser1 ?"profile__edit__image-selected" : "profile__edit__image"} onClick={onChangeUser1}/>
                    </label>                    
                    
                    <label forHtml="image__choice2" className="profile__edit__input-label">
                        <input type="radio" id="image__choice2" name="image__selector" value="user2" checked={checkedUser2} onChange={onChangeUser2}/>
                        <img src={user2} alt="user2" className={checkedUser2 ?"profile__edit__image-selected" : "profile__edit__image"} onClick={onChangeUser2}/>
                    </label>                    
                    
                    <label forHtml="image__choice3" className="profile__edit__input-label">
                        <input type="radio" id="image__choice3" name="image__selector" value="user3" checked={checkedUser3} onChange={onChangeUser3}/>
                        <img src={user3} alt="user3" className={checkedUser3 ?"profile__edit__image-selected" : "profile__edit__image"} onClick={onChangeUser3}/>
                    </label>                    
                    
                </div>

                <label forHtml="name" className="profile__edit__name-label">
                    Name
                    <input type="text" id="name" className="profile__edit__name-input" value={profileName} placeholder="Profile name" onChange={handleNameChange}/>
                </label>

                <hr className="profile__edit__hr"/>

                <div className="profile__edit__buttoms-container">
                    <button type="submit" className="profile__edit__save-buttom">Save</button>
                    
                    <Link to="/profiles">

                        <button className="profile__edit__cancel-buttom">Cancel</button>
                    
                    </Link> 
                </div>

            </form>

        </div>

    </div>
  )
}

export default ProfileEdit