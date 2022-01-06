import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const MainLayout = React.lazy(() => import(/* webpackChunkName: "main-layout" */'components/layout/MainLayout.js'))
const loading = (
  <div>Loading...</div>
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
