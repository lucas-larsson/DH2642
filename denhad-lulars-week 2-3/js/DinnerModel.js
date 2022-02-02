class DinnerModel {
  constructor(guests = 2, dishes = [], currentDish = null, observers = []) {
    this.observers = observers
    this.dishes = dishes
    this.setNumberOfGuests(guests)
    this.setCurrentDish(currentDish)
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  notifyObservers() {
    try {
      this.observers.forEach((observer) => observer())
    } catch (err) {
      console.error(err)
    }
  }

  setDishes(dishes) {
    this.dishes = [...dishes]
    this.notifyObservers()
  }
  setNumberOfGuests(x) {
    if (x > 0 && Math.floor(x) === x) {
      const oldValue = this.numberOfGuests
      this.numberOfGuests = x
      if (oldValue !== x) this.notifyObservers()
    } else {
      throw new Error('Number of guests must be greater than 0, integer and 0 <')
    }
  }
  addToMenu(dish) {
    if (!dishExists(this.dishes, dish.id)) {
      this.dishes = [...this.dishes, dish]
      this.notifyObservers()
    }
  }

  removeFromMenu(id) {
    if (dishExists(this.dishes, id)) {
      this.dishes = this.dishes.filter((d) => d.id !== id)
      this.notifyObservers()
    }
  }
  setCurrentDish(id) {
    if (this.currentDish === id) return
    this.currentDish = id
    this.currentDishDetails = null
    this.currentDishError = null
    this.notifyObservers()
    if (this.currentDish) {
      DishSource.getDishDetails(this.currentDish)
        .then((details) => {
          if (this.currentDish === id) {
            this.currentDishDetails = details
            this.notifyObservers()
          }
        })
        .catch((err) => {
          if (this.currentDish === id) {
            this.currentDishError = err
            this.notifyObservers()
          }
        })
    }
  }
}

function dishExists(dishes, id) {
  return dishes.find((d) => d.id === id)
}

function getIngredients(dishArr) {
  const result = {} // object used as mapping
  dishArr.forEach((d) =>
    d.extendedIngredients.forEach((i) => {
      if (!result[i.id])
        // ingredient not taken into account yet
        // associate the ingredient with the ID
        // {...i } is a *copy* of the ingredient (spread syntax)
        // we copy just in case, as we’ll change the object below
        result[i.id] = { ...i }
      else {
        /*TODO: add i.amount to the amount of result[i.id]*/
        result[i.id].amount += i.amount
      }
    })
  )
  return Object.values(result)
}
