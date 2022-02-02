const SidebarPresenter = ({ model }) => {
  const numberOfGuests = useModelProperty(model, 'numberOfGuests')
  const dishes = useModelProperty(model, 'dishes')
  return (
    <SidebarView
      guests={numberOfGuests}
      setGuest={(numberOfGuests) => {
        model.setNumberOfGuests(numberOfGuests)
      }}
      dishChoice={(id) => {
        model.setCurrentDish(id)
      }}
      removeDish={(id) => {
        model.removeFromMenu(id)
      }}
      dishes={dishes}
    />
  )
}
