import dva from 'dva'
import { browserHistory } from 'dva/router'
import router from './router'

import './index.scss'

// 1.Initialize
const app = dva({
  history: browserHistory,
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

// import * as serviceWorker from './serviceWorker';

// serviceWorker.unregister();
