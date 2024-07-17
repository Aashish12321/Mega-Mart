import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  category: [],
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories : (state, action) => {
        state.category = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCategories } = categorySlice.actions

export default categorySlice.reducer;
