function promiseNoData(promise, data, error) {
  return promise ? (
    data || error ? (
      data ? (
        false
      ) : (
        <span>{error}</span>
      )
    ) : (
      <img src='http://www.csc.kth.se/~cristi/loading.gif' />
    )
  ) : (
    <span>no data</span>
  )
}
