const crypto = require('crypto');

/**
 *
 * @param {String} string
 */
function makeUrlSafe(string) {
  return string.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 *
 * @param {object} param0
 */
export default function generateToken({ stringBase = 'base64', byteLength = 48, forUrl = true } = {}) {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(byteLength, (err, buffer) => {
      if (err) {
        reject(err);
      } else if (forUrl) {
        resolve(makeUrlSafe(buffer.toString(stringBase)));
      } else {
        resolve(buffer.toString(stringBase));
      }
    });
  });
}


// async function handler(req, res) {
//   // default token length
//   const newToken = await generateToken();
//   console.log('newToken', newToken);

//   // pass in parameters - adjust byte length
//   const shortToken = await generateToken({ byteLength: 20 });
//   console.log('newToken', shortToken);
// }
