import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Helmet from 'react-helmet';
import Landing from './Landing';
import Header from './includes/Header';

class App extends Component {
  render() {
   
    return (
      <div>
      <Helmet bodyAttributes={{style: 'background-color : #fff3e0'}}/>
      <BrowserRouter>
      <div >
        <Header />
        <Switch>
        <Route exact path="/" component={Landing} />
       
        </Switch>
      </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
