const express = require('express')
const cors = require('cors')
var multer = require('multer');

const app = express();
app.use(cors());
const upload = multer();

const port = 3000;
process.env.PWD = process.cwd();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const gcRoutes = require('./routes/gc-routes');
app.use('/gc', gcRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
