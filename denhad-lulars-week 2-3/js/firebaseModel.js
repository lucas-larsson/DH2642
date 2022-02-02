const REF = 'dinnerModel' + 12
function persistModel(model) {
  let loadingFromFirebase = false
  model.addObserver(() => {
    if (loadingFromFirebase) return
    firebase.database().ref(REF).set({
      guests: model.numberOfGuests,
      dishes: model.dishes,
      currentDish: model.currentDish,
    })
  })
  firebase
    .database()
    .ref(REF)
    .on('value', (data) => {
      loadingFromFirebase = true
      try {
        if (data.val()) {
          model.setNumberOfGuests(data.val().guests)
          model.setDishes(data.val().dishes || null)
          model.setCurrentDish(data.val().currentDish || null)
        }
      } catch (e) {
        console.error(e)
      } finally {
        loadingFromFirebase = false
      }
    })
}
