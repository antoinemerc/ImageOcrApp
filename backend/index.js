const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());

const port = 3000;
process.env.PWD = process.cwd();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const gcRoutes = require('./routes/gc-routes');
app.use('/gc', gcRoutes);

const kmeansRoutes = require('./routes/kmeans-routes');
app.use('/kmeans', kmeansRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
