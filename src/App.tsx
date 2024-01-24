import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import NavBar from './components/ui/NavBar';
import Main from './layout/Main';
import Login from './layout/Login';
import Users from './layout/Users';

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/login'}>
                    <Route path={':type'} element={<Login/>}/>
                    <Route path={''} element={<Login/>}/>
                </Route>
                <Route path={'/users'}>
                    <Route path={':userId'} element={<Users/>}>
                        <Route path={':edit'} element={<Users/>}/>
                        <Route path={''} element={<Users/>}/>
                    </Route>
                    <Route path={''} element={<Users/>}/>
                </Route>
                <Route path={'*'} element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    )
}

export default App;
