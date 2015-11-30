var app = require('index.js')

var server = app.listen(process.env.port || 3000)

// export default app
module.exports = {
    server : server,
    app : app
};
