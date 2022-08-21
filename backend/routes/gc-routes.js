const { GoogleCloud } = require('../models/GoogleCloud');

const router = require('express').Router();

const gcInstance = new GoogleCloud();

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