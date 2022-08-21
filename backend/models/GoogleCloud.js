// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
const fs = require('fs')

// Get keyfilename from Google cloud to get this class working
class GoogleCloud {

  imageAnnotatorClient;

  constructor() {
    const keyFilenamePath = `${process.env.PWD}\\ocrimageprocess-keyfilename.json`;
    try {
      fs.access(keyFilenamePath, fs.F_OK, (err) => {
        if (err) {
          throw err
        }
        const options = {
          keyFilename: keyFilenamePath,
        }
        this.imageAnnotatorClient = new vision.ImageAnnotatorClient(options);
      })
    } catch (err) {
      console.error(err);
    }
  }

  /**
    * initialize a connection to gc
    * this is for test purpose mainly, all gc method include an initialize
   */
  async getInitializeStatus() {
    return this.imageAnnotatorClient.initialize();
  }

  /**
   * Annotate a single local image for test purpose
   * @returns {Promise<any[]>} text annotation
   * the first element is an overview, the rest are each nodes found
   */
  async getLocalSampleImageAnnotation() {
    const testImage = `${process.env.PWD}\\assets\\img\\MFW.jpg`;
    const detections = await this.getTextAnnotationFromRequest(testImage);
    console.table('Text:');
    detections.forEach(text => console.log(text));
    return detections;
  }

  // Todo: KO, Finish this method to handle incoming data from frontend
  async sendAllImagesGoogleVision(imageList) {
    const features = [{ type: 'LABEL_DETECTION' }];

    const request = imageList.map(image => {
      return {
        image: {
          source: {
            imageUri: inputImageUri,
          },
        },
        features: features,
      };
    });
  }

  // Todo: KO, Finish this method to handle uploaded file
  async getTextAnnotationFromImageUri(imageUri) {
    const features = [{ type: 'LABEL_DETECTION' }];

    const request = {
      image: {
        source: {
          imageUri: imageUri,
        },
      },
      features: features,
    };
    await this.getTextAnnotationFromRequest(request);
  }

  /**
   * Get Text annotation from a request object
   * @param {*} request see G:\Projects\ocrManhwa\backend\node_modules\@google-cloud\vision\build\src\helpers.js l600 for doc
   * @returns {Promise<any[]>} text annotation
   * the first element is an overview, the rest are each nodes found
   */
  async getTextAnnotationFromRequest(request) {
    const [result] = await this.imageAnnotatorClient.textDetection(request);
    const detections = result.textAnnotations;
    return detections;
  }
}

module.exports.GoogleCloud = GoogleCloud; 