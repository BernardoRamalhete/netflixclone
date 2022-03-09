import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import profileService from './profileService'

const initialState = {
    profiles: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createProfile = createAsyncThunk('profiles/create', async (props, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const id = thunkAPI.getState().auth.user._id
        return await profileService.createProfile(props.profileName, props.userPhoto, id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getProfiles = createAsyncThunk('profiles/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const id = thunkAPI.getState().auth.user._id
        return await profileService.getProfiles(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteProfile = createAsyncThunk('profiles/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const userId = thunkAPI.getState().auth.user._id
        return await profileService.deleteProfile(userId, id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const editProfile = createAsyncThunk('profiles/edit', async (props, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const userId = thunkAPI.getState().auth.user._id
        return await profileService.editProfile(props.newName, props.newPicture, userId, props.profileId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profiles = action.payload
            })
            .addCase(createProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profiles = action.payload
            })
            .addCase(getProfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profiles = action.payload.profiles
            })
            .addCase(deleteProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(editProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.profiles = action.payload.profiles
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = profileSlice.actions
export default profileSlice.reducer