import edituser1 from '../images/edituser1.png'
import edituser2 from '../images/edituser2.png'
import edituser3 from '../images/edituser3.png'
import '../styles/ProfilesManage.css'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteProfile} from '../features/profiles/profileSlice'

function ProfileEditItem(props) {
    const dispatch = useDispatch()
    let img

    switch (props.profile.picture) {
        case '../images/user1.png':
            img = edituser1
            break;
        case '../images/user2.png':
            img = edituser2
            break;
        case '../images/user3.png':
            img = edituser3
            break;
        default:
            img = edituser1
    }

    const onDelete = () => {
        dispatch(deleteProfile(props.profile._id))
    }


    return (
        <div>

            <span onClick={onDelete} className="profileManage__profile-delete-Link">
                <button className="profileManage__delete">Delete this profile</button>
            </span>

            <Link to='/profile/edit' state={{profile: props.profile}} className="profileManage__Link">
                <div className="profileManage__item">
                    <img src={img} alt="user1" className="profileManage__picture" />
                    <p className="profileManage__name">{props.profile.name}</p>
                </div>
            </Link>



        </div>
    )
}

export default ProfileEditItem
