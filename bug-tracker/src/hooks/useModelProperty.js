import { useEffect, useState } from 'react'

/* Custom hook */
const useModelProperty = (model, prop) => {
  const [value, setValue] = useState(model[prop])

  useEffect(() => {
    const observer = () => setValue(model[prop])
    model.addObserver(observer)
    return () => model.removeObserver(observer)
  }, [model])
  return value
}

export default useModelProperty
