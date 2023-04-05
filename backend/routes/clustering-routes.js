const { Clustering } = require('../models/Clustering');
const router = require('express').Router();

var multer = require('multer');
var upload = multer();

const clustering = new Clustering();

router.get('', async (req, res) => {
  const availableRoutes = {
    'title': 'Available routes',
    'routes': [
      'Get -  /test-sample-json',
      'Get -  /test-sample-data',
      'Get -  /test-sample-centroid',
      'Get -  /test-python-scrip'
    ]
  };
  res.send(availableRoutes)
});

router.get('/test-sample-json', async (req, res) => {
  res.send(await clustering.getSampleJson());
});

router.get('/test-sample-data', async (req, res) => {
  res.send(await clustering.getDataFromSampleJson());
});

router.get('/generate-sample-data-file', async (req, res) => {
  const jsonData = await clustering.getDataFromSampleJson();
  clustering.writeJsonToFile(jsonData, 'generatedData');
  res.send(jsonData);
});

router.get('/test-python-script', async (req, res) => {
  const result = await clustering.testPythonPipeline();
  res.send(result);
});

module.exports = router;