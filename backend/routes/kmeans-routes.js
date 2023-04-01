const { KMeansClustering } = require('../models/KMeansClustering');
const router = require('express').Router();

var multer = require('multer');
var upload = multer();

const kmeans = new KMeansClustering();

router.get('', async (req, res) => {
  const availableRoutes = {
    'title': 'Available routes',
    'routes': [
      'Get -  /test-sample-json',
      'Get -  /test-sample-data',
      'Get -  /test-sample-centroid',
    ]
  };
  res.send(availableRoutes)
});

router.get('/test-sample-json', async (req, res) => {
  res.send(await kmeans.getSampleJson());
});

router.get('/test-sample-data', async (req, res) => {
  res.send(await kmeans.getDataFromSampleJson());
});

router.get('/generate-sample-data-file', async (req, res) => {
  const jsonData = await kmeans.getDataFromSampleJson();
  kmeans.writeJsonToFile(jsonData, 'generatedData');
  res.send(jsonData);
});

module.exports = router;