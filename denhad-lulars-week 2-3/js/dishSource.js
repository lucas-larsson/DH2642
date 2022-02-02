const DishSource = {
  // JS object creation literal
  apiCall(params) {
    return (
      fetch(BASE_URL + params, {
        method: 'GET', // HTTP method
        headers: {
          // HTTP headers
          'X-Mashape-Key': API_KEY,
          'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        },
      })
        .then((response) => {
          if (response.status !== 200) throw new Error(response.statusText)
          return response
        })
        // from HTTP response headers to HTTP response data
        .then((response) => response.json())
    )
  }, // comma between object entries

  searchDishes(params) {
    return DishSource.apiCall(`recipes/search?${objToQueryParams(params)}`).then((response) => response.results)
  },
  getDishDetails(id) {
    return DishSource.apiCall(`recipes/${id}/information`)
  },
}
