const SearchPresenter = ({ model }) => {
  const [promise, setPromise] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchType, setSearchType] = React.useState('')

  React.useEffect(() => {
    setPromise(DishSource.searchDishes({}))
  }, [])

  const [data, error] = usePromise(promise)

  return (
    <>
      <SearchFormView
        options={['starter', 'main course', 'dessert']}
        onText={setSearchQuery}
        onDishType={setSearchType}
        onSearch={() => setPromise(DishSource.searchDishes({ query: searchQuery, type: searchType }))}
      />
      {promiseNoData(promise, data, error) || (
        <SearchResultsView searchResults={data} dishChosen={(id) => model.setCurrentDish(id)} />
      )}
    </>
  )
}
