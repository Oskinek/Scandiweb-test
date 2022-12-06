import { createSlice } from '@reduxjs/toolkit'

export const categorySelectorSlice = createSlice({
  name: 'categorySelector',
  initialState: {
    name: 'all',
  },
  reducers: {
    changeCategory(state,action) {
      state.name= action.payload
    }
  }
})
export const {changeCategory} = categorySelectorSlice.actions

export default categorySelectorSlice.reducer