const { GoogleCloud } = require('../models/GoogleCloud');
const router = require('express').Router();

var multer = require('multer');
var upload = multer();

const gcInstance = new GoogleCloud();

router.get('', async (req, res) => {
  const availableRoutes = {
    'title': 'Available routes',
    'routes': [
      '/test-init',
      '/test-sample',
    ]
  };
  res.send(availableRoutes)
});

const cpUpload = upload.fields([{ name: 'imagesToAnnotate', maxCount: 1000 }])
router.post('', cpUpload, async (req, res) => {
  console.log(req.files)
  console.log(req.body)
  req.on('readable', function () {
    console.log(req.read());
  });
  const availableRoutes = {
    'title': 'Available Post',
    'routes': [
      '/test-init',
      '/test-sample',
    ]
  };
  res.send(availableRoutes)
});


router.get('/test-init', async (req, res) => {
  gcInstance.getInitializeStatus().then((serviceStub) => {
    console.log('SUCCESS - executed initialize', serviceStub);
    res.send(`Success`);
  }).catch((error) => {
    console.log('ERROR - initialize didnt work', error);
    res.send(error);
  })
});

router.get('/test-sample', async (req, res) => {
  const detection = await gcInstance.getLocalSampleImageAnnotation().catch((error) => {
    console.log('ERROR - problem while processing image', error);
    res.send(error);
  })
  res.send(detection)
});

module.exports = router;