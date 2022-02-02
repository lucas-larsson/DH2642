import { useSelector, useDispatch } from 'react-redux';
import { boardActions } from '../reducers/boardReducer';

const useBoardState = () => {
  const boardState = useSelector(state => state.boardState);
  const dispatch = useDispatch();

  return {
    board: {
      get activeBoard() {
        return boardState.board;
      },
      get activeBoardMeta() {
        return boardState.meta;
      },
      get name() {
        return boardState.board.boardName;
      },
      get members() {
        return boardState.board.members;
      },
      get tickets() {
        return boardState.board.tickets;
      },
      get selectedTicket() {
        return boardState.board.selectedTicket;
      },
      setBoard: board => {
        dispatch(boardActions.setBoard(board));
      },
      setBoardID: id => {
        dispatch(boardActions.setBoardID(id));
      },
      setBoardName: name => {
        dispatch(boardActions.setBoardName(name));
      },
      setBoardMembers: members => {
        dispatch(boardActions.setBoardMembers(members));
      },
      setBoardTickets: tickets => {
        dispatch(boardActions.setBoardTickets(tickets));
      },
      addTicket: ticket => {
        dispatch(boardActions.addTicket(ticket));
      },
      selectTicket: board => {
        dispatch(boardActions.selectTicket(board));
      },
      removeTicket: ticketId => {
        dispatch(boardActions.removeTicket(ticketId));
      },
      setBoardMeta: meta => {
        dispatch(boardActions.setBoardMeta(meta));
      },
      addObserver: observer => {
        dispatch(boardActions.addObserver(observer));
      },
      clearObservers: () => {
        dispatch(boardActions.clearObservers());
      },
    },
  };
};

export default useBoardState;
