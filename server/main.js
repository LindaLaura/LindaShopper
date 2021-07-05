// init function. 
//Start listening and create a 'server' object representing our server

const PORT = 1337
const server = require('./index')
const db  = require('./db/db')

const init = async () => {
  try {
    await db.sync();
    server.listen(PORT, () => console.log(`
          Listening on port ${PORT}
          http://localhost:${PORT}/
      `));
  } catch (err) {
    console.log(`There was an error starting up!`, err);
  }
}

init();