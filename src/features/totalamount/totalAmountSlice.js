import { createSlice } from '@reduxjs/toolkit'

export const totalAmountSlice = createSlice({
  name: 'total Amount sumary',
  initialState: {
    total: 0,
  },
  reducers: {
    setTotal(state,action) {
      state.total= action.payload
    }
  }
})
export const {addToTotal} = totalAmountSlice.actions

export default totalAmountSlice.reducer