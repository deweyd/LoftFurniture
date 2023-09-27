import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import {createStore} from "redux";
import {rootReducer} from './assets/store/reducers.jsx'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(rootReducer)
console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
          <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
)
