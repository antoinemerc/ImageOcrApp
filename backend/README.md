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

 'Get -  ',
      'Get -  ',
      'Get -  ,
      'Get -  ',
    ]

## Google Cloud

In case you forget, you need to generate/get a keyfilename to get the api working if you pull on a new computer.

Drop it in the 'backend' directory and rename it 'ocrimageprocess-keyfilename.json' to get this working

[Google get started include keyFilename generation](https://cloud.google.com/vision/docs/detect-labels-image-client-libraries)