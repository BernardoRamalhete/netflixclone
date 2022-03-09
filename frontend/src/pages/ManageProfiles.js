import React from 'react'
import ProfilesHeader from '../components/ProfilesHeader'
import ProfilesManageComp from '../components/ProfilesManage'
import '../styles/Profiles.css'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {toast} from 'react-toastify'

function ManageProfiles() {

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth)
  const {isError, message} = useSelector((state) => state.profiles)

  useEffect(() => {
    if(user.user == null) {
      
      navigate('/login')
      
    }
  }, [user, navigate])

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
  }, [isError, message])

  return (
    <div className="ProfilesBody">
        <ProfilesHeader/>
        <ProfilesManageComp/>
    </div>
  )
}

export default ManageProfiles