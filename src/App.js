import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { AlertContext } from './components/AlertContext';
import AlertModal from './components/AlertModal';
import HeaderPage from './components/HeaderPage';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PostRead from './components/PostRead';
import PostsPage from './components/PostsPage';

function App() {
    const [box, setBox] = useState({
        show: false,
        message: '',
        action: null
    });

    return (
        <AlertContext.Provider value={{box, setBox}}>
        <div className="App">
            <HeaderPage/>
            <Switch>
                <Route path="/" component={HomePage} exact={true}/>
                <Route path="/posts" component={PostsPage} exact={true}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/posts/:id" component={PostRead}/>
            </Switch>
        </div>
        
        { box.show && <AlertModal box={box} setBox={setBox}/> }
        </AlertContext.Provider>
    );
}

export default App;
