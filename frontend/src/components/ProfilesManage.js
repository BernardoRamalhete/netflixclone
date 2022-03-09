import '../styles/ProfilesManage.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProfiles, reset } from '../features/profiles/profileSlice'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import ProfileEditItem from '../components/ProfileEditItem'

function ProfilesManageComp() {

    const dispatch = useDispatch()

    const { profiles, isLoading, isError, message } = useSelector((state) => state.profiles)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getProfiles())

        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch])


    if (isLoading) {
        return <Spinner imgSrc="https://www.rchandru.com/images/portfolio/loading.gif" bgColor="#000" />
    }

    return (
        <>
            <div className="centerManage__group">

                <h2 className="profilesManage__text">Manage profiles:</h2>

                <div className="profilesManage__group">
                        
                    {profiles.map((profile) => 
                        <ProfileEditItem key={profile._id} profile={profile}/>
                    )}


                </div>


            </div>

            <div className="profileManage__button-container">

                <Link to="/profiles" className="profileManage__button-link">
                    <button className="profilesManage__manage__button">Done</button>
                </Link>

            </div>
        </>
    )
}

export default ProfilesManageComp