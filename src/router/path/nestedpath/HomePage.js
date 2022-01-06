import React from "react";

let HomePage = {
    path: '/',
    name: 'homePage',
    component: React.lazy(() => import(/* webpackChunkName: "home-screen" */'views/home/HomeScreen.js'))
};

export default HomePage