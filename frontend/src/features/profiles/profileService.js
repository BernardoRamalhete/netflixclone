import axios from 'axios'

const createProfile = async (name, profileURL, id, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const bodyParameters = {
        name,
        pictureURL: profileURL,
        id
    }

    const response = await axios.post('/profile/create', bodyParameters, config)

    return response.data
}

const getProfiles = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const parameters = {
        id
    }

    const response = await axios.post('/profile', parameters, config)

    return response.data
}

const deleteProfile = async (userId, id, token) => {

    const headers = {
            'Authorization': `Bearer ${token}`
        }

    const data = {
            userId: userId
        }

    const response = await axios.delete(`/profile/delete/${id}`, {headers, data})

    return response.data
}

const editProfile = async (newName, newPicture, userId, profileId, token) => {
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const data = {
        userId: userId,
        newName: newName,
        newPicture: newPicture,
    }

    const response = await axios.put(`/profile/edit/${profileId}`, data, {headers: headers})

    return response.data
}

const profileService = {
    createProfile,
    getProfiles,
    deleteProfile,
    editProfile
}

export default profileService