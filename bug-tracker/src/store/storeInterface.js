import { userActions } from '../reducers/userReducer';
import { boardActions } from '../reducers/boardReducer';
import { userProjectsActions } from '../reducers/userProjectsReducer';
import store from './';

const storeInterface = {
  user: {
    get activeUser() {
      return store.getState().userState.user;
    },
    get isLoggedIn() {
      return store.getState().userState.user.id !== null;
    },
    get id() {
      return store.getState().userState.user.id;
    },
    setUser: user => {
      store.dispatch(userActions.setUser(user));
    },
    logout: () => {
      store.dispatch(userActions.logout());
    },
  },
  board: {
    get activeBoard() {
      return store.getState().boardState.board;
    },
    get boardMeta() {
      return store.getState().boardState.board.meta;
    },
    get name() {
      return store.getState().boardState.board.name;
    },
    get members() {
      return store.getState().boardState.board.members;
    },
    get tickets() {
      return store.getState().boardState.board.tickets;
    },
    get selectedTicket() {
      return store.getState().boardState.board.selectedTicket;
    },
    setBoard: board => {
      store.dispatch(boardActions.setBoard(board));
    },
    setBoardID: id => {
      store.dispatch(boardActions.setBoardID(id));
    },
    setBoardName: name => {
      store.dispatch(boardActions.setBoardName(name));
    },
    setBoardMembers: members => {
      store.dispatch(boardActions.setBoardMembers(members));
    },
    setBoardTickets: tickets => {
      store.dispatch(boardActions.setBoardTickets(tickets));
    },
    addTicket: ticket => {
      store.dispatch(boardActions.addTicket(ticket));
    },
    selectTicket: ticket => {
      store.dispatch(boardActions.selectTicket(ticket));
    },
    addObserver: observer => {
      store.dispatch(boardActions.addObserver(observer));
    },
  },
  userProjects: {
    setUserProjects: projects => {
      store.dispatch(userProjectsActions.setUserProjects(projects));
    },
    addUserProject: userProject => {
      store.dispatch(userProjectsActions.addUserProject(userProject));
    },
    removeUserProject: userProjectID => {
      store.dispatch(userProjectsActions.removeUserProject(userProjectID));
    },
  },
};

export default storeInterface;
