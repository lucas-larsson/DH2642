const SummaryPresenter = ({ model }) => {
  const numberOfGuests = useModelProperty(model, 'numberOfGuests')
  const dishes = useModelProperty(model, 'dishes')
  return <SummaryView persons={numberOfGuests} ingredients={getIngredients(dishes)} />
}
