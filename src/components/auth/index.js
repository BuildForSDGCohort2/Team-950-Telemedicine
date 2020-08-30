import RegisterComponent from './register.react';
import ForgotPasswordComponent from './passwords/forgot-password.react';
import ResetPasswordComponent from './passwords/reset-password.react';
import LoginComponent from './login.react';

// const Home = React.lazy(() => import("./home"));
// const About = React.lazy(() => import("./about"));

export default [
  { path: '/register', component: RegisterComponent },
  { path: '/login', component: LoginComponent },
  { path: '/reset-password', component: ForgotPasswordComponent },
  { path: '/forgot-password', component: ResetPasswordComponent },
];

export {
  RegisterComponent,
  LoginComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
};
