import { BoardPresenter, FooterPresenter, MainNavPresenter } from '../presenters';
import { useEffect } from 'react';
import { useBoardState } from '../hooks';

import { persistBoardModel } from '../api/persistBoardModel';

const BoardPage = () => {
  const { board } = useBoardState();
  useEffect(() => {
    persistBoardModel(board.addObserver);
  }, []);

  return (
    <>
      <MainNavPresenter />
      <BoardPresenter />
      <FooterPresenter />
    </>
  );
};

export default BoardPage;
