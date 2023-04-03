# Image OCR Backend

Handler of image and applying OCR on them using Google Cloud Vision

## Available Routes

| Request | Routes               | Description |
| ------- | -------------------- | ----------- |
|   Get   | /gc                  | return a list of action for this route       |
|   Get   | /gc/test-init        | Test connection to google cloud       |
|   Get   | /gc/test-sample      | Test google vision api with a local sample file |
|   Post  | /gc/annotate-images  | Send images to Google Cloud vision for annotation return a JSON with the result |

| Request | Routes               | Description |
| ------- | -------------------- | ----------- |
|   Get   | /kmeans                             | return a list of action for this route       |
|   Get   | /kmeans/test-sample-json            |        |
|   Get   | /kmeans/test-sample-data            |  |
|   Get   | /kmeans/test-sample-centroid'       | |


## Google Cloud

In case you forget, you need to generate/get a keyfilename to get the api working if you pull on a new computer.

Drop it in the 'backend' directory and rename it 'ocrimageprocess-keyfilename.json' to get this working

[Google get started include keyFilename generation](https://cloud.google.com/vision/docs/detect-labels-image-client-libraries)

### Google Vision

Takes an image in a post request and submit it for annotation to google vision, result have this json structure

| {
        "locations": [],
        "properties": [],
        "mid": "",
        "locale": "",
        "description": "COMING",
        "score": 0,
        "confidence": 0,
        "topicality": 0,
        "boundingPoly": {
          "vertices": [
            { "x": 89, "y": 581 },
            { "x": 198, "y": 581 },
            { "x": 198, "y": 600 },
            { "x": 89, "y": 600 }
          ],
          "normalizedVertices": []
        }
      },|<img width="266" alt="Capture d’écran 2023-04-03 à 18 03 25" src="https://user-images.githubusercontent.com/15010119/229565434-35a9918e-6553-4896-9145-36036aa4a4c3.png">|

## Clustering

Cluster detection of google vision result is done via python (called by nodejs backend), currently 3 methods are implemented :
 - Ward Agglomerative Clustering
 - Mean Shift
 - KMeans
 
 Mean Shift is the current one used, when visualised we get cluster of words, ideally separated in different sentences
 
 <img width="897" alt="Capture d’écran 2023-04-03 à 17 44 37" src="https://user-images.githubusercontent.com/15010119/229561935-fe39be30-2278-4a30-b950-cf546606f6b6.png">

this result is used to give full sentence for future traduction, either through a manual download of an excel or through google translate
Some tool will be necessary to clean up result of clustering, in the example above "Clench" should be it's own cluster and the top-left "o" should be excluded


 
