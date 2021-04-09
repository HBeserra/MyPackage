const app = require('./app')

const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3333 

console.log(`Server starting in : http://localhost:${port}/`)
app.listen(port)
