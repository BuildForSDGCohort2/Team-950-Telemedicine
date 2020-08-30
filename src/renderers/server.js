import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from "react-router-dom";

import { App } from 'components/App';

// consider https://github.com/staylor/react-helmet-async

export async function serverRenderer(req, context) {
  const initialData = {
    appName: 'Reactful',
  };

  const pageData = {
    title: `Hello ${initialData.appName}`,
  };

  const helmet = Helmet.renderStatic();

  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <StaticRouter>
        <App initialData={initialData} location={req.url} context={context}/>
      </StaticRouter>
    ),
    pageData,
    helmet
  });
}
