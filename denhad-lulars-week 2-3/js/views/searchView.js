function SearchResultsView(props) {
  return (
    <div
      onClick={(e) => {
        props.dishChosen(e.target.id)
        window.location.hash = '#details'
      }}
    >
      {props.searchResults.map((searchResult) => (
        <span id={searchResult.id} key={searchResult.id}>
          {searchResult.name}
          <img
            src={`https://spoonacular.com/recipeImages/${searchResult.image}`}
            alt='image for searchResults'
            class='searchResult'
            id={searchResult.id}
            style={{ width: 'auto', height: '300px' }}
          />
        </span>
      ))}
    </div>
  )
}
const SearchFormView = (props) => {
  return (
    <div>
      <button onClick={() => (window.location.hash = '#summary')} class='navigation-button'>
        Summary
      </button>
      <input type='text' placeholder='Search' onInput={(e) => props.onText(e.target.value)} />
      <select onChange={(e) => props.onDishType(e.target.value)}>
        <option>Choose:</option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={props.onSearch}>Search!</button>
    </div>
  )
}
