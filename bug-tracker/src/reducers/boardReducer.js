import { createSlice } from '@reduxjs/toolkit';
import { BoardModel } from '../core';

const initialState = {
  board: new BoardModel(),
  update: 0,
};

const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {
    setBoard: (state, action) => {
      state.board.setBoard(action.payload);
      state.update++;
    },
    setBoardID: (state, action) => {
      state.board.setBoardID(action.payload);
    },
    setBoardName: (state, action) => {
      state.board.setBoardName(action.payload);
    },
    setBoardMembers: (state, action) => {
      state.board.setBoardMembers(action.payload);
    },
    setBoardTickets: (state, action) => {
      state.board.setBoardTickets(action.payload);
    },
    addTicket: (state, action) => {
      state.board.addTicket(action.payload);
    },
    removeTicket: (state, action) => {
      state.board.removeTicket(action.payload);
    },
    selectTicket: (state, action) => {
      state.board.selectTicket(action.payload);
    },
    addObserver: (state, action) => {
      state.board.addObserver(action.payload);
    },
    setBoardMeta: (state, action) => {
      state.board.setMeta(action.payload);
    },
    clearObservers: (state, action) => {
      state.board.clearObservers();
    },
  },
});

export const boardActions = boardSlice.actions;
export default boardSlice.reducer;
