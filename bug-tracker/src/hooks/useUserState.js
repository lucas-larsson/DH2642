import { useSelector } from 'react-redux';

const useUserState = () => {
  const userState = useSelector(state => state.userState);

  return {
    user: {
      get activeUser() {
        return userState.user;
      },
      get name() {
        return userState.user.name;
      },
      get id() {
        return userState.user.id;
      },
      get isLoggedIn() {
        return userState.user.id !== null;
      },
    },
  };
};

export default useUserState;
