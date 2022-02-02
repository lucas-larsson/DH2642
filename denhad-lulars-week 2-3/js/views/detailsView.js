const DetailsView = ({ dish, people, isDishInMenu, dishAdded, cancel }) => {
  return (
    <div id='detailsView'>
      <h3>{dish.title}</h3>
      <div>
        <img src={dish.image} alt={dish.title} class='detailsImage' />
        <ul class='imageAndPrice'>
          <li>Price: {dish.pricePerServing}</li>
          <li>
            for {people} guests: {(dish.pricePerServing * people).toFixed(2)}
          </li>
        </ul>
      </div>
      <ul class='box'>
        {dish.extendedIngredients.map((ingredient, index) => (
          <li key={`detailsViewExtendedIngredient-${ingredient.id}-${index}`}>
            {ingredient.name}: {ingredient.amount * people} {ingredient.measures.unitShort}
          </li>
        ))}
      </ul>
      <div>
        {dish.analyzedInstructions.map((analyzedInstructions, index) => (
          <ul class='box' key={`analyzedInstructions-${index}`}>
            {analyzedInstructions.steps.map((step, index) => (
              <li key={`step-${index}`}>{step.step}</li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type='button'
        disabled={isDishInMenu}
        onClick={(e) => {
          dishAdded()
          window.location.hash = '#search'
        }}
      >
        Add to menu!
      </button>
      <button
        onClick={() => {
          cancel()
          window.location.hash = '#search'
        }}
      >
        Cancel
      </button>
      <a id='moreInformationLink' href={dish.sourceUrl} target='_blank'>
        More information
      </a>
    </div>
  )
}
