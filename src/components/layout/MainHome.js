import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'components/navigation/Header';

function MainHome (props) {
    return (
        <>
            <Header />
            <Suspense>
                <Switch>
                    {
                        props.routeChild.map((route, index) => {
                            return route.component && (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    render={propsChild => (
                                        <route.component {...propsChild} />
                                    )}
                                > 
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Suspense>
        </>
    )
}

export default React.memo(MainHome);