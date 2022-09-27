import { createSlice } from '@reduxjs/toolkit'



const initialState = { userdata: null }

export const updateToken = (data) => dispatch => {
    dispatch(updateData(data))
}

const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    updateData(state,{payload}) {
      console.log(payload)
      console.log(state)
      state.userData = payload
    },
    
  },
})

export const { updateData } = userData.actions
export default userData.reducer