import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import RoomManagement from './components/adminPanel/roomManagement';
import UserManagement from './components/adminPanel/userManagement';
import Signin from './components/auth/Signin';
import Dashboard from './components/dashboard/dashboard';
import MessageForm from './components/dashboard/messageForm';
import { Provider } from "react-redux";
import store from './store'
import Alert from './components/alert/Alert';
import { Redirect} from "react-router-dom";
import dashboard from './components/dashboard/dashboard';


function App() {
  
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Alert />
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Dashboard path='/'> 
              <Route path="/messages" component={MessageForm}  />
              <Route
                path="/admin-panel/user-management"
                component={UserManagement}
              />
              <Route
                path="/admin-panel/room-management"
                component={RoomManagement}
              />
            </Dashboard>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
