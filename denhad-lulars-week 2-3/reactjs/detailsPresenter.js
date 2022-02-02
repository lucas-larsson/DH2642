const DetailsPresenter = ({ model }) => {
  const currentDish = useModelProperty(model, 'currentDish')
  const currentDishDetails = useModelProperty(model, 'currentDishDetails')
  const currentDishError = useModelProperty(model, 'currentDishError')
  const numberOfGuests = useModelProperty(model, 'numberOfGuests')
  const dishes = useModelProperty(model, 'dishes')

  return (
    promiseNoData(currentDish, currentDishDetails, currentDishError) || (
      <DetailsView
        people={numberOfGuests}
        dish={currentDishDetails}
        isDishInMenu={dishes.find((d) => d.id == currentDish)}
        cancel={() => model.setCurrentDish(null)}
        dishAdded={() => model.addToMenu(currentDishDetails)}
      />
    )
  )
  // return (<DetailsView  dish={currentDish} people={numberOfGuests} isDishInMenu={}/>)
}
