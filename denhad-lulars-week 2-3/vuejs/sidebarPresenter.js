const SidebarPresenter = ({ model }) => {
  return (
    <SidebarView
      guests={model.numberOfGuests}
      setGuest={(numberOfGuests) => {
        model.setNumberOfGuests(numberOfGuests)
      }}
      dishChoice={(id) => {
        model.setCurrentDish(id)
      }}
      removeDish={(id) => {
        model.removeFromMenu(id)
      }}
      dishes={model.dishes}
    />
  )
}
