import * as React from 'react';
import { Route, Switch } from "react-router-dom";

import Navbar from "./nav/default-nav";
import routes from './routes';
import HomeComponent from './Home.react';
import DashboardComponent from './dashboard.react';
import { NotFoundComponent } from "./errors";
import { LoginComponent, RegisterComponent } from './auth';
import { AlreadyLoggedInGuard } from './auth/authguards.react';



export function App({ initialData }) {

  const authService = { isAuthenticated: true };

  return (
    <div id="#components-layout-demo-fixed">
      <Navbar />
        <div className="site-layout-background" style={{ padding: 24, minHeight: 380, margin: '16px 0' }}>
          <Switch>
            {/* { routes.map(route => (
              <Route key={route.path} {...route} />
            ))} */}
            <AlreadyLoggedInGuard path='/register' authService={authService}>
              <RegisterComponent />
            </AlreadyLoggedInGuard>
            <AlreadyLoggedInGuard path='/login' authService={authService}>
              <LoginComponent />
            </AlreadyLoggedInGuard>

            <Route exact path='/' component={HomeComponent} />
            <Route path='/dashboard' exact component={DashboardComponent} />
            <Route component={NotFoundComponent} />
          </Switch>
        </div>
  </div>
  );
}
