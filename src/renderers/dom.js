import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { App } from 'components/App';

import '../styles/index.css';

ReactDOM.hydrate(
  <BrowserRouter>
    <App initialData={window.__R_DATA.initialData} />
  </BrowserRouter>,
  document.getElementById('root'),
);
