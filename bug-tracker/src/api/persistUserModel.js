import { getAuth, onAuthStateChanged } from 'firebase/auth';
import storeInterface from '../store/storeInterface';

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    storeInterface.user.setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    storeInterface.user.logout();
    localStorage.removeItem('user');
  }
});
