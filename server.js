var app = require('index.js')

var server = app.listen(3000, () => {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})

// export default app
module.exports = {
    server : server,
    app : app
};
