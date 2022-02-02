const objToQueryParams = (obj) => {
  const queryParams = []
  for (const key in obj) {
    queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  }
  return queryParams.join('&')
}
