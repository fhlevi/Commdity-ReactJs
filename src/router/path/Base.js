import React from "react";
import HomePage from 'router/path/nestedpath/HomePage';

let Base = {
    name: 'BasePath',
    path: '/',
    component: React.lazy(() => import(/* webpackChunkName: "main-home" */'components/layout/MainHome.js')),
    children: [
        HomePage
    ]
}

export default Base;