import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import OtherPage from './OtherPage'
import Fib from './Fib.old'

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
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={OtherPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
