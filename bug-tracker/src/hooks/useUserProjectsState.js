import { useSelector, useDispatch } from 'react-redux';
import { userProjectsActions } from '../reducers/userProjectsReducer';

const useUserProjectsState = () => {
  const userProjectsState = useSelector(state => state.userProjectsState);
  const dispatch = useDispatch();

  return {
    userProjects: {
      get allUserProjects() {
        return userProjectsState.userProjects;
      },
      setUserProjects: userProjects => {
        dispatch(userProjectsActions.setUserProjects(userProjects));
      },
      addUserProject: userProject => {
        dispatch(userProjectsActions.addUserProject(userProject));
      },
      removeUserProject: userProjectID => {
        dispatch(userProjectsActions.removeUserProject(userProjectID));
      },
    },
  };
};
export default useUserProjectsState;
