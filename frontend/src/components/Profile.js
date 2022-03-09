import {Link} from 'react-router-dom'
import user1 from '../images/user1.png'
import user2 from '../images/user2.png'
import user3 from '../images/user3.png'


function Profile(props) {
    let img;

    switch (props.profile.picture) {
        case '../images/user1.png':
            img = user1
        break;
        case '../images/user2.png':
            img = user2
        break;
        case '../images/user3.png':
            img = user3
        break;
        default:
            img = user1
    }

  return (
    <div>

        <div className="profile__item">
            <Link to="/browse" className="profile__link" state={{profile: props.profile}}>
                <img src={img} alt="user1" className="profile__picture" />
                <p className="profile__name">{props.profile.name}</p>
            </Link>
        </div>

    </div>
  )
}

export default Profile