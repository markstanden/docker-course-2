import React from 'react'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import OtherPage from './OtherPage'
import Fib from './Fib'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <ul>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
          </ul>
        </header>
        <div>
          <Switch>
            <Route exact path="/">
              <Fib />
            </Route>
            <Route path="/otherpage">
              <OtherPage />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
