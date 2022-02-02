import { getDatabase, ref, set, child, onValue, remove } from 'firebase/database';
import storeInterface from '../store/storeInterface';

export const persistBoardModel = addObserver => {
  let loadingFromFirebase = false;
  addObserver(board => {
    let ticket = board.tickets[board.newlyAddedTicketId];
    if (!ticket || loadingFromFirebase) return;
    const db = getDatabase();
    set(ref(db, 'boards/' + board.id + '/tickets/' + ticket.id), {
      id: ticket.id,
      title: ticket.title,
      content: ticket.description,
      status: ticket.status,
      priority: ticket.priority,
      userId: ticket.userId,
      createdAt: ticket.createdAt.toString(),
      updatedAt: ticket.updatedAt.toString(),
    }).catch(console.error);
  });

  addObserver(board => {
    if (!board.newlyRemovedTicketId || loadingFromFirebase) return;
    const db = getDatabase();
    remove(child(ref(db, 'boards/' + board.id + '/tickets/'), board.newlyRemovedTicketId)).catch(console.error);
  });

  const boardId = JSON.parse(localStorage.getItem('boardId'));
  if (!boardId) return;
  const db = getDatabase();
  onValue(child(ref(db, 'boards/'), boardId), snap => {
    loadingFromFirebase = true;
    try {
      if (snap.val()) {
        setTimeout(() => {
          storeInterface.board.setBoard(snap.val());
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      loadingFromFirebase = false;
    }
  });
};
