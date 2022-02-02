const Show = (props) => {
  const [hashState, setHashState] = React.useState(window.location.hash)
  React.useEffect(() => {
    window.addEventListener('hashchange', () => {
      setHashState(window.location.hash)
    })
    return () => {
      window.removeEventListener('hashchange', () => {
        setHashState(window.location.hash)
      })
    }
  }, [])
  return <div class={hashState === props.hash ? 'show' : 'hide'}>{props.children}</div>
}
