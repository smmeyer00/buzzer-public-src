import './styles.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import UserPage from './pages/UserPage';


function App() {

    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <FeedPage/>
          </Route>

          <Route path='/login'>
            <LoginPage/>
          </Route>

          <Route path='/signup'>
            <SignupPage/>
          </Route>

          <Route path='/search'>
            <SearchPage/>
          </Route>

          <Route path='/profile'>
            <ProfilePage/>
          </Route>

          <Route path='/user/:username'>
            <UserPage/>
          </Route>
        </Switch>
      </Router>
        
    );
  
}

export default App;
