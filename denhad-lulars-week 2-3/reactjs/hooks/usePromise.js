const usePromise = (promise = null) => {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  React.useEffect(() => {
    setData(null)
    setError(null)
    if (promise) promise.then(setData).catch(setError)
  }, [promise])
  return [data, error]
}
