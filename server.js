'use strict';

let connect = require('connect');
let serveStatic = require('serve-static');
var port = process.env.PORT || 8081;
connect().use(serveStatic('build/')).listen(port, () => console.log(`Listening on http://localhost:${port}`));