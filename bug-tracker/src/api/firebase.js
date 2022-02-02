import routes from '../localization/routes';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { get, child, getDatabase, ref, remove } from 'firebase/database';

let LOADING_FROM_FIREBASE = false;

export const login = async (email, password) => {
  const auth = await getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      window.location.pathname = routes.HOME_PATH;
      return userCredential.user;
    })
    .catch(error => {
      throw error;
    });
};

export const signUp = async (email, password) => {
  const auth = await getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      window.location.pathname = routes.HOME_PATH;
      return userCredential.user;
    })
    .catch(error => {
      throw error;
    });
};

export const signOutUser = async () => {
  const auth = await getAuth();
  return signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      window.location.pathname = routes.LOGIN_PATH;
      return true;
    })
    .catch(error => {
      throw error;
    });
};

export const getBoard = async boardId => {
  if (!boardId || LOADING_FROM_FIREBASE) return;
  try {
    LOADING_FROM_FIREBASE = true;
    const db = getDatabase();
    const boardRef = ref(db, 'boards/');

    return get(child(boardRef, boardId))
      .then(snap => {
        if (snap.exists()) return { ...snap.val(), tickets: snap.val().tickets || [] };
        else console.error('Failed to retrieve Boards', boardRef);
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    console.error(error);
  } finally {
    LOADING_FROM_FIREBASE = false;
  }
};

export const getAllBoards = async () => {
  if (LOADING_FROM_FIREBASE) return;
  try {
    LOADING_FROM_FIREBASE = true;
    const db = getDatabase();
    const boardRef = ref(db, 'boards/');
    return get(boardRef)
      .then(snap => {
        if (snap.exists()) {
          return snap.val();
        } else console.error('Failed to retrieve All Boards');
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    console.error(error);
  } finally {
    LOADING_FROM_FIREBASE = false;
  }
};

export const getUserProject = async uid => {
  if (LOADING_FROM_FIREBASE) return;
  try {
    LOADING_FROM_FIREBASE = true;
    const db = getDatabase();
    const userProjectsRef = ref(db, 'userProjects/');
    return get(child(userProjectsRef, uid + '/boards/'))
      .then(snap => {
        if (snap.exists()) {
          return snap.val() ? Object.entries(snap.val()) : [];
        } else console.error('Failed to retrieve userProject', userProjectsRef);
      })
      .catch(error => {
        throw error;
      });
  } catch (error) {
    console.error(error);
  } finally {
    LOADING_FROM_FIREBASE = false;
  }
};

export const deleteBoard = async (userId, boardId) => {
  if (LOADING_FROM_FIREBASE) return;
  try {
    const db = getDatabase();
    remove(child(ref(db, 'userProjects/' + userId + '/boards/'), boardId));
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
