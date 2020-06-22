import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import Users from './user/pages/Users'
import NewPlace from './places/pages/NewPlace'
import UserPlaces from './places/pages/UserPlaces'
import MainNavigation from './shared/components/Navigation/MainNavigation'
const App = ()=>{

  return <Router>
    <MainNavigation/>
    <main>
    <Switch>
      
   <Route path = "/" exact>
     <Users/>
   </Route>
   <Router path ="/:userId/places" exact>
     <UserPlaces/>
   </Router>
   <Route path = "/Places/new" exact>
     <NewPlace/>
   </Route>

   <Redirect to="/"/>
   </Switch>
   </main>
  </Router>

};

export default App;
