import { createSlice } from '@reduxjs/toolkit';
const sortByBoardName = (a, b) => {
  const first = a[1];
  const second = b[1];
  if (first.boardName < second.boardName) return -1;
  if (first.boardName > second.boardName) return 1;
  return 0;
};

const initialState = {
  userProjects: [],
};

const userProjectsSlice = createSlice({
  name: 'userProjectsState',
  initialState,
  reducers: {
    setUserProjects: (state, action) => {
      state.userProjects = action.payload.sort(sortByBoardName);
    },
    addUserProject: (state, action) => {
      if (!state.userProjects.find(project => project[0] === action.payload[0]))
        state.userProjects = [...state.userProjects, action.payload].sort(sortByBoardName);
    },
    removeUserProject: (state, action) => {
      state.userProjects = state.userProjects.filter(project => project[0] != action.payload);
    },
  },
});

export const userProjectsActions = userProjectsSlice.actions;
export default userProjectsSlice.reducer;
