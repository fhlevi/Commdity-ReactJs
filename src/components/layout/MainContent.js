import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routePath from 'router/routes.js';

function MainContent() {
    return ( 
        <>
            <Suspense>
                <Switch>
                    {
                        routePath.map((route, index) => {
                            return route.component && (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={props => (
                                        <route.component routeProps={props} routeChild={route.children} />
                                    )}
                                >
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Suspense>
        </>
    );
}

export default MainContent;