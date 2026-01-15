import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null, // admin or student
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.loading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.role = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
