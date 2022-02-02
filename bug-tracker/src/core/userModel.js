class User {
  constructor(email = null, id = null, boards = [], observers = []) {
    this.name = email ? email.substring(0, email.lastIndexOf('@')) : null
    this.email = email
    this.id = id
    this.boards = boards
    this.observers = observers
  }

  logout() {
    this.name = null
    this.email = null
    this.id = null
    this.boards = []
    this.observers = []
  }

  addObserver(callback) {
    this.observers.push(callback)
  }
  removeObserver(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback)
  }
  notifyObservers() {
    try {
      this.observers.forEach((observer) => observer())
    } catch (error) {
      console.error(error)
    }
  }
}

export default User
