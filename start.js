require('babel-core/register');

const server = require('./server/server').default;

const port = process.env.PORT || 5050;
server.listen(port, '0.0.0.0');

console.log(`Application listening on port ${port}`);

module.exports = server;
