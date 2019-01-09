import dva from 'dva'
import createHistory from 'history/createHashHistory'
import router from './router'

import './index.scss'

import * as serviceWorker from './serviceWorker'

// 1.Initialize
const app = dva({
  history: createHistory(),
  onError(e, dispatch) {
    console.error(e)
  }
})

// 2. Plugins
// app.use({})

// 3. Model
app.model(require('./models/app').default)

// 4.Router
app.router(router)

// 5. Start
app.start('#root')

serviceWorker.unregister()
