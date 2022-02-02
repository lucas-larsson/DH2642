//create class for tickets
import { generateId } from '../utils';
class Ticket {
  constructor(title, description, status, priority, userId, createdAt, updatedAt, id = generateId()) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.id = id;
  }
}

export default Ticket;
