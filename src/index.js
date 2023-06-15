import React from "react"
import { createRoot } from "react-dom/client"
import App from "./Components/App"
import { Provider } from "react-redux"
import store from "./store"
import { HashRouter } from "react-router-dom"
import "./styles.css"
import { ParallaxProvider } from "react-scroll-parallax"

const root = createRoot(document.querySelector("#root"))

root.render(
  <Provider store={store}>
    <HashRouter>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </HashRouter>
  </Provider>
)
