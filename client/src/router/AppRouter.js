import React from 'react';
import { BrowserRouter, Route, Routes, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import loadingImg from '../img/Loading_icon.gif';
import Analytics from '../components/Analytics'
import loadable from '@loadable/component';

const LoadingComponent = () => <img src={loadingImg} />;

//#region import components 

const AsyncHomePage = loadable(() => import('../components/HomePage'))

//#endregion

//set up route data
const routerData = [
    {
        path: '/',
        element: <Analytics childElement={<AsyncHomePage/>} />
    }
]

const router = createBrowserRouter(routerData);

//build router
export default () => {
    return(
        <RouterProvider router={router} />
    )
}