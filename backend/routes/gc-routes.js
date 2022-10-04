const { GoogleCloud } = require('../models/GoogleCloud');
const router = require('express').Router();

var multer = require('multer');
var upload = multer();

const gcInstance = new GoogleCloud();

router.get('', async (req, res) => {
  const availableRoutes = {
    'title': 'Available routes',
    'routes': [
      'Get -  /test-init',
      'Get -  /test-sample',
      'Post - /annotate-images',
    ]
  };
  res.send(availableRoutes)
});

// Middleware fills req.file as { propertyName: [file1, file2...]} with propertyName the value of name in upload.field
// rest of data is in req.body
const cpUpload = upload.fields([{ name: 'imagesToAnnotate', maxCount: 1000 }])
router.post('/annotate-images', cpUpload, async (req, res) => {
  const annotationList = await gcInstance.getAllImagesAnnotation(req.files.imagesToAnnotate).catch((error) => {
    console.log('ERROR - problem while processing', error);
    res.send(error);
  });
  res.send(annotationList);
});


router.get('/test-init', async (req, res) => {
  gcInstance.getInitializeStatus().then((serviceStub) => {
    console.log('SUCCESS - executed initialize', serviceStub);
    res.send(`Success`);
  }).catch((error) => {
    console.log('ERROR - initialize didnt work', error);
    res.send(error);
  });
});

router.get('/test-sample', async (req, res) => {
  const detection = await gcInstance.getLocalSampleImageAnnotation().catch((error) => {
    console.log('ERROR - problem while processing image', error);
    res.send(error);
  })
  res.send(detection)
});

module.exports = router;