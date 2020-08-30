const bunyan = require('bunyan');
// const generateToken = require('../util/token.generator');

const logger = bunyan.createLogger({
  name: 'myapp',
  // src: process.env.NODE_ENV === 'development',
  serializers: bunyan.stdSerializers,
  level: 'info',
  streams: [
    {
      path: 'src/server/logs/app.log'
    },
    {
      stream: process.stdout
    }
  ]
});


function requestLogger() {
  return (req, res, next) => {
    const log = logger.loggerInstance.child({
      id: req.id,
      body: req.body
    }, true);
    log.info({
      req
    });
    next();
  };
}

// app.use(responseLogger());
// app.use(requestLogger());

function responseLogger() {
  return (req, res, next) => {
    function afterResponse() {
      res.removeListener('finish', afterResponse);
      res.removeListener('close', afterResponse);
      const log = logger.loggerInstance.child({
        id: req.id
      }, true);
      log.info({ res }, 'response');
    }

    res.on('finish', afterResponse);
    res.on('close', afterResponse);
    next();
  };
}

module.exports = { logger, requestLogger, responseLogger };
// app.post("/stuff", function (req, res) {

//   var response = {
//     fullname: `${req.body.firstname} ${req.body.lastname}`
//   }
//   logger.logResponse(req.id, response, 200);
//   res.status(200).send(response);
// });

// Generate UUID for request and add it to X-Request-Id header.
// In case request contains X-Request-Id header, uses its value instead.
