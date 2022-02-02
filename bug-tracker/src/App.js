import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import routes from './localization/routes';
import { LoginPage, HomePage, BoardPage, SignupPage, AboutPage } from './pages';
import './api/firebaseSetup.js';
import './api/persistUserModel';
import './api/persistBoardModel';

const App = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if ((location.pathname === routes.LOGIN_PATH || location.pathname === routes.SIGNUP_PATH) && user) {
      window.location.pathname = routes.HOME_PATH;
    } else if (location.pathname !== routes.LOGIN_PATH && location.pathname !== routes.SIGNUP_PATH && !user) {
      window.location.pathname = routes.LOGIN_PATH;
    }
  }, [user, location.pathname]);

  return (
    <Routes>
      <Route exact path={routes.LOGIN_PATH} element={<LoginPage />} />
      <Route exact path={routes.SIGNUP_PATH} element={<SignupPage />} />
      <Route exact path={routes.HOME_PATH} element={<HomePage />} />
      <Route exact path={routes.ABOUT_PATH} element={<AboutPage />} />
      <Route exact path={routes.BOARD_PATH} element={<BoardPage />} />
      <Route path={routes.DEFAULT_PATH} element={<Navigate to={routes.LOGIN_PATH} />} />
    </Routes>
  );
};

export default App;
