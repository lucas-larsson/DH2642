import { generateId } from '../utils';
class BoardModel {
  constructor(boardName = null, tickets = [], members = [], observers = [], id = null, meta = null) {
    this.observers = observers;
    this.boardName = boardName;
    this.tickets = tickets;
    this.members = members;
    this.id = id;
    this.selectedTicket = '';
    this.meta = meta;
    this.newlyAddedTicketId = null;
    this.newlyRemovedTicketId = null;
  }

  /* ---------- Unset ---------- */
  unset() {
    // this.observers = [];
    this.boardName = [];
    this.tickets = [];
    this.members = [];
    this.id = null;
    this.selectedTicket = '';
    this.meta = null;
  }

  /* ---------- Mutations ---------- */
  // create addTicket
  addTicket(ticket) {
    this.newlyAddedTicketId = ticket.id;
    this.tickets = { ...this.tickets, [ticket.id]: ticket };
    this.newlyRemovedTicketId = null;
    this.notifyObservers();
  }

  removeTicket(id) {
    delete this.tickets[id];
    this.newlyRemovedTicketId = id;
    this.newlyAddedTicketId = null;
    this.notifyObservers();
  }

  addMember(member) {
    if (this.members.find(m => memEquals(m, member))) return;
    this.members = [...this.members, member];
    this.notifyObservers();
  }

  removeMember(member) {
    if (!this.members.find(m => memEquals(m, member))) return;
    this.members = this.members.filter(m => m !== member);
    this.notifyObservers();
  }

  selectTicket(ticket) {
    if (this.selectTicket !== ticket) {
      this.selectTicket = ticket;
      this.notifyObservers();
    }
  }

  /* ---------- Observers ---------- */

  addObserver(callback) {
    this.observers.push(callback);
  }

  removeObserver(callback) {
    this.observers = this.observers.filter(obs => obs !== callback);
  }

  clearObservers() {
    this.observers = [];
  }

  notifyObservers() {
    try {
      this.observers.forEach(observer => observer(this));
    } catch (error) {
      console.error(error);
    }
  }

  /* SETTERS */

  setBoardTickets(tickets) {
    this.tickets = tickets ? tickets : [];
    this.notifyObservers();
  }

  setBoardMembers(members) {
    this.members = members ? members : [];
    this.notifyObservers();
  }

  setBoardName(name) {
    this.boardName = name ? name : 'New Board';
    this.notifyObservers();
  }

  setBoardID(id) {
    this.id = id ? id : generateId();
    this.notifyObservers();
  }

  setBoard(data) {
    this.id = data.meta.id;
    this.boardName = data.boardName;
    this.tickets = data.tickets;
    this.members = data.members;
  }
  setMeta(meta) {
    this.unset();
    this.meta = meta;
    this.id = meta.id;
    this.boardName = meta.title;
    const user = JSON.parse(localStorage.getItem('user'));
    this.addMember(user.uid);
  }
}

function memEquals(m1, m2) {
  if (m1.id !== m2.id) return false;
  return true;
}

export default BoardModel;
