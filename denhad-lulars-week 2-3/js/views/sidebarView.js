const SidebarView = ({ guests, setGuest, dishes, removeDish, dishChoice }) => {
  const types = ['starter', 'main course', 'dessert']
  function dishType(dish) {
    if (dish.dishTypes) {
      const tp = dish.dishTypes.filter((value) => types.includes(value))
      if (tp.length) return tp[0]
    }
    return ''
  }

  function compareDishes(a, b) {
    let ai = types.indexOf(dishType(a))
    let bi = types.indexOf(dishType(b))
    if (ai < bi) return -1
    if (ai > bi) return 1
    return 0
  }

  return (
    <div>
      <button disabled={guests < 2} onClick={() => setGuest(guests - 1)}>
        -
      </button>
      {guests}
      <button onClick={() => setGuest(guests + 1)}>+</button>
      <table>
        <tbody>
          {[...dishes].sort(compareDishes).map((dish, index) => {
            const { title, pricePerServing, id } = dish
            return (
              <tr key={`dishTableRow-${index}`}>
                <td>
                  <button onClick={() => removeDish(id)}>x</button>
                </td>
                <td>
                  <a
                    href=''
                    onClick={(e) => {
                      e.preventDefault()
                      dishChoice(id)
                      window.location.hash = '#details'
                    }}
                  >
                    {title}
                  </a>
                </td>
                <td>{dishType(dish)}</td>
                <td class='dishPrice'>{(pricePerServing * guests).toFixed(2)}</td>
              </tr>
            )
          })}
          <tr>
            <td></td>
            <td>Total:</td>
            <td></td>
            <td>{dishes.reduce((acc, dish) => acc + dish.pricePerServing * guests, 0).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
