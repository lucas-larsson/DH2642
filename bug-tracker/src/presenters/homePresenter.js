import { useState, useEffect } from 'react';
import { HomeView } from '../views';
import { deleteBoard } from '../api';
import { AsyncDataWrapper } from './';
import { getUserProject } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { usePromise, useUserProjectsState, useUserState } from '../hooks';
import routes from '../localization/routes';

const HomePresenter = () => {

  const navigate = useNavigate();
  const { user } = useUserState();
  const { userProjects } = useUserProjectsState();

  const [promise, setPromise] = useState(null);
  const [data, err] = usePromise(promise);

  const userId = JSON.parse(localStorage.getItem('user')).uid;

  const removeBoard = async boardId => {
    try {
      const res = await deleteBoard(user.id, boardId);
      if (res) userProjects.removeUserProject(boardId);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (data) userProjects.setUserProjects(data);
  }, [data]);

  useEffect(() => {
    localStorage.removeItem('boardId');
    setPromise(getUserProject(userId));
  }, []);

  return (
    <AsyncDataWrapper data={data} error={err}>
      <HomeView
        onBoardClicked={b => {
          localStorage.setItem('boardId', JSON.stringify(b[0]));
          navigate(routes.BOARD_PATH, { replace: false });
        }}
        removeBoard={removeBoard}
      />
    </AsyncDataWrapper>
  );
};

export default HomePresenter;
