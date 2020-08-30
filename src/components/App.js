import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Layout  } from 'antd';

import Navbar from "./nav/default-nav";
import routes from './routes';
import HomeComponent from './Home.react';
import DashboardComponent from './dashboard.react';
import { NotFoundComponent } from "./errors";
import { LoginComponent, RegisterComponent } from './auth';
import { AlreadyLoggedInGuard } from './auth/authguards.react';


const { Content, Footer } = Layout;

export function App({ initialData }) {

  const authService = { isAuthenticated: true };

  return (
    <Layout id="#components-layout-demo-fixed">
      <Navbar />
      <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
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
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
  );
}
