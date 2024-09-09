import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    list: [] // Initialize with an empty array
  },
  reducers: {
    postin : (state, action) => {
      state.list.push(action.payload); 
      console.log(action.payload)// Push the new post to the list
      console.log(state.list)
    } ,
    postout : (state,action)=>{
        state.list = [] ;
    }
    // Add other reducers if needed
  }
});

export const { postin , postout } = postSlice.actions;
export default postSlice.reducer;


