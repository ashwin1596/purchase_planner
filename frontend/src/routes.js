import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import ItemsPage from "./pages/itemspage";
import Register from "./pages/register";
import TopNav from "./components/TopNav";

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <TopNav />
            <Routes>
                <Route path="/" Component={Dashboard} />
                <Route path="/login" Component={Login} />
                <Route path="/register" Component={Register} />
                <Route path="/items" Component={ItemsPage} />
            </Routes>
        </BrowserRouter>
    )
}