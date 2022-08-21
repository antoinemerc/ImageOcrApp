# Image OCR Backend

Handler of image and applying OCR on them using Google Cloud Vision on them

## Available Routes

| Routes               | Description |
| ---------------------| ----------- |
| /gc/test-init        | Test connection to google cloud       |
| /gc/test-sample      | Test google vision api with a local sample file |

## Google Cloud

In case you forget, you need to generate/get a keyfilename to get the api working if you pull on a new computer.

Drop it in the 'backend' directory and rename it 'ocrimageprocess-keyfilename.json' to get this working

[Google get started include keyFilename generation](https://cloud.google.com/vision/docs/detect-labels-image-client-libraries)