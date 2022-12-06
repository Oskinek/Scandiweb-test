import { createSlice } from '@reduxjs/toolkit'

export const currencyToggleSlice = createSlice({
  name: 'currencyToggle',
  initialState: {
    on: false,
  },
  reducers: {
    toggleState(state) {
      state.on = !state.on
    },
    toggleFalse(state) {
      if(state.on===true) {
        state.on = false
      }
    }
  }
})
export const {toggleState} = currencyToggleSlice.actions
export const {toggleFalse} = currencyToggleSlice.actions

export default currencyToggleSlice.reducer