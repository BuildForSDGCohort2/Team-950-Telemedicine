import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import serialize from 'serialize-javascript';

import { errorHandler, notFoundHandler } from './middleware';
import config from 'server/config';
import { serverRenderer } from 'renderers/server';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.enable('trust proxy');
app.use(morgan('common'));


app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());

app.locals.serialize = serialize;

if (config.isDev) {
  app.locals.gVars = {
    main: ['main.css', 'main.js'],
    // vendor: ['vendor.css', 'vendor.js'],
    vendor: 'vendor.js'
  };
} else {
  try {
    app.locals.gVars = require('../../.reactful.json');
  } catch (err) {
    console.error('Reactful did not find Webpack generated assets');
  }
}

/**
 * App Variables
 */
if (!config.PORT) {
  process.exit(1);
}


routes(app);

app.get('/*', async (req, res) => {
  try {
    const context = {};
    const vars = await serverRenderer(req, context);
    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res.render('index', vars);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



app.use(errorHandler);
app.use(notFoundHandler);


app.listen(config.PORT, config.HOST, () => {
  console.info(`Running on ${config.HOST}:${config.PORT}...`);
});
