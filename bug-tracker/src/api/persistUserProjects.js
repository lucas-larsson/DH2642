import { getDatabase, ref, set, get } from 'firebase/database';
import storeInterface from '../store/storeInterface';
const firebaseBoardsRef = 'boards/';
const firebaseUserProjectRef = 'userProjects/';

export const persistUserProjects = addObserver => {
  addObserver(board => {
    const meta = board.meta;
    const userId = JSON.parse(localStorage.getItem('user')).uid;
    if (!(userId && board.id && board.boardName && meta)) return;
    const db = getDatabase();
    set(ref(db, firebaseUserProjectRef + userId + '/boards/' + board.id + '/'), {
      boardName: board.boardName,
      meta,
    })
      .then(() => {
        const transformedData = [board.id.toString(), { boardName: board.boardName, meta }];
        storeInterface.userProjects.addUserProject(transformedData);
      })
      .catch(console.error);
  });
  addObserver(board => {
    const meta = board.meta;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!(board.id && board.boardName)) return;
    const db = getDatabase();
    get(ref(db, firebaseBoardsRef + board.id))
      .then(snapshot => {
        if (snapshot.exists()) {
          //add memeber to board
          set(ref(db, firebaseBoardsRef + board.id + '/members/' + user.uid), {
            email: user.email,
          });
        } else {
          //create board
          set(ref(db, firebaseBoardsRef + board.id), {
            boardName: board.boardName,
            tickets: board.tickets,
            members: {
              [user.uid]: {
                email: user.email,
              },
            },
            meta,
          }).catch(console.error);
        }
      })
      .catch(console.error);
  });
};
