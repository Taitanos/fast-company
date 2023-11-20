import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar";
import Main from "./layout/Main";
import Login from "./layout/Login";
import Users from "./layout/Users";

function App() {

    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/users"} element={<Users/>}>
                    <Route path={":userId"} element={<Users/>}>
                        <Route path={":edit"} element={<Users/>}/>
                        <Route path={""} element={<Users/>}/>
                    </Route>
                </Route>
                <Route path={"*"} element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    )
}

export default App;
