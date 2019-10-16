import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Request from 'react-http-request';

import Home from './components/home';

const Welcome = ({client, message}) => {
  return (
    <div>
      <h1>Welcome to {client}!</h1>
      <p>{message}</p>
    </div>
  )
};

class App extends Component {

  render() {
    return (
    <Router>
        <header className="text-center">
          <Welcome client="Busbud" message="Bus to the Osheaga festival!"/>
          {/*<nav>NavBar</nav>*/}
        </header>
        <main id="main" role="main" className="flex-shrink-0">
          <Home />
          {/* <Switch>
            <Route exact path="/search">
              <Search />
            </Route>
          </Switch> */}
        </main>
        <footer className="footer mt-auto py-3">
          <div className="container">
            <span className="text-muted">Author: Judi Desire</span>
          </div>
        </footer>
    </Router>
    );
  }
}

export default App;

/*
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  // componentDidMount() {

    fetch('https://napi.busbud.com', {
      method: "GET",
      // body: JSON.stringify(data),
      headers: {
        // "Content-Type": "application/vnd.busbud+json",
        "Accept": "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/",
        "X-Busbud-Token": "PARTNER_AHm3M6clSAOoyJg4KyCg7w",
        "Accept-Language": "fr-CH, fr;q=0.9, en-US, en;q=0.5, *;q=0.5"
      },
      credentials: "same-origin"
    }).then(function(response) {
      console.log("response",response);
      // response.status     //=> number 100–599
      // response.statusText //=> String
      // response.headers    //=> Headers
      // response.url        //=> String

      return response.text()
    }, function(error) {
      error.message //=> String
    })

    // fetch('https://napi.busbud.com')
    //   .then(response => response.json())
    //   .then(data => this.setState({ data }));


  // }
  render() {
    return (
      <div>Hello World!</div>
    );
  }

}
*/
/*
import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
