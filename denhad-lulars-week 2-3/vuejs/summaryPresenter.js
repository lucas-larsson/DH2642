const SummaryPresenter = ({ model }) => {
  return <SummaryView persons={model.numberOfGuests} ingredients={getIngredients(model.dishes)} />
}
