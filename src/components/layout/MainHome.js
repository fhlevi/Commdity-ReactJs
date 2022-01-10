import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from 'components/navigation/Header';
import { Box } from '@mui/material';

function MainHome (props) {
    return (
        <>
            <Header />
            <Box sx={{ 
                px: 3, 
                py: 4 
             }}>
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
            </Box>
        </>
    )
}

export default React.memo(MainHome);