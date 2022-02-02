import { createStore } from 'redux'
import rootReducer from '../reducers'
const store =
  process.env.NODE_ENV === 'development'
    ? createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
      ) // second argument enables redux dev tools in chrome
    : createStore(rootReducer)
export default store
