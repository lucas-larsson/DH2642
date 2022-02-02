const useModelProperty = (model, property) => {
  const [value, setValue] = React.useState(model[property])
  React.useEffect(() => {
    const observer = () => setValue(model[property])
    model.addObserver(observer)
    return () => model.removeObserver(observer)
  }, [model])
  return value
}
