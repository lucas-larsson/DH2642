function SummaryView({ persons, ingredients }) {
  function compareIngredients(a, b) {
    if (a.aisle < b.aisle) return -1
    else if (a.aisle > b.aisle) return 1
    else {
      if (a.name < b.name) return -1
      else if (a.name > b.name) return 1
    }
    throw new Error('They need to be unique!')
  }

  return (
    <div>
      <button onClick={() => (window.location.hash = '#search')} class='navigation-button'>
        Back to search
      </button>
      Dinner for <span title='nr. guests'>{persons}</span> guests:
      <table class='summaryview'>
        <thead class='summaryview'>
          <tr class='summaryview'>
            <th class='summaryview'>Name</th>
            <th class='summaryview'>Aisle</th>
            <th class='summaryview'>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.sort(compareIngredients).map((ingredient) => (
            <tr key={`summaryViewRow-${ingredient.id}`} class='summaryview'>
              <td class='summaryview'>{ingredient.name}</td>
              <td class='summaryview'>{ingredient.aisle}</td>
              <td class='summaryview'>{`${(ingredient.amount * persons).toFixed(2)} ${
                ingredient.measures.metric.unitShort
              }`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
