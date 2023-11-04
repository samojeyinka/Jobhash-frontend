import './App.css';
import {Route, Router,Routes} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import LaunchScreen from './pages/Launch-screen';
import Intro from './pages/Intro';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import Header from './components/Header';
import Edit from './pages/Edit';


function App() {
  return (
    <Routes>

      {/* Routes */}
      <Route exact path='/' Component={LaunchScreen}/>
      <Route path='/introduction' Component={Intro}/>
      <Route path='/register' Component={Register}/>
       <Route path='/login' Component={Login}/>  
       <Route path='/:id' Component={Dashboard}/>
       <Route path='/hash' Component={Create}/> 
       <Route path='/edit/:id' Component={Edit}/> 
      </Routes>
     
  );
}

export default App;
