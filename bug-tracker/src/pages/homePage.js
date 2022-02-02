import { useEffect } from 'react';
import { HomePresenter, MainNavPresenter, FooterPresenter } from '../presenters';
import { useBoardState } from '../hooks';
import { persistUserProjects } from '../api/persistUserProjects';

const HomePage = () => {
  const { board } = useBoardState();
  useEffect(() => {
    persistUserProjects(board.addObserver);
  }, []);
  return (
    <>
      <MainNavPresenter />
      <HomePresenter />
      <FooterPresenter />
    </>
  );
};
export default HomePage;
