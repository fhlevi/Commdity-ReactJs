import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Box } from '@mui/system';

const MainLayout = React.lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import(/* webpackChunkName: "main-layout" */'components/layout/MainLayout.js')), 3000)
  })
})

const loading = (
  <div className="preloader">
      <Box sx={{ 
        height: '100vh',
        justifyContent: 'center', 
        alignItems: 'center', 
        display: 'flex' 
      }}>
        <div className="loading-animate"></div>
    </Box>
  </div>
)

class App extends React.Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route
                path="/"
                name="HomePages"
                render={(props) => <MainLayout props={props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
