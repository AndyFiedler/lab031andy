import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
// State Only
import ToDo from './components/todo/todo.js';
// API Connected (Live Data)
import ToDoConnected from './components/todo/todo-connected.js';
import ItemCountProvider from './context/itemContext';
import DisplayCompletedProvider from './context/displayCompletedContext';

export default class App extends React.Component {
  render() {
    return (
      <>
      <ItemCountProvider>
        <DisplayCompletedProvider>
        <BrowserRouter>
          <nav className="vertical" style={{textAlign: 'center'}} >
            <ul>
              <li><Link to="/" style={{width: "100%"}}>Local ToDo</Link></li>
              <li><Link to="/connected" style={{width: "100%"}}>Connected ToDo</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path="/connected" component={ToDoConnected} />
            <Route component={ToDo} />
          </Switch>
        </BrowserRouter>
        </DisplayCompletedProvider>
        </ItemCountProvider>
      </>
    );
  }
}
