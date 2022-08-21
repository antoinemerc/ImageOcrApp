const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const gcRoutes = require('./routes/gc-routes');
app.use('/gc', gcRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})