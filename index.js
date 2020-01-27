const server = require('./api/server.js');

const PORT = process.env.PORT || 5000;
if (!module.parent) {
  server.listen(PORT, () => {
    console.log(`\n=== Server listening on port ${PORT} ===\n`);
  });
}

module.exports = server