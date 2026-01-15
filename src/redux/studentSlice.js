import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    studentsList: [],
  },
  reducers: {
    setStudents: (state, action) => {
      state.studentsList = action.payload;
    },
  },
});

export const { setStudents } = studentSlice.actions;
export default studentSlice.reducer;
