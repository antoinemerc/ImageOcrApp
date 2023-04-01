const fs = require('fs');
const { spawn } = require('child_process');

class AnnotationStruct {
  naiveK;//: number;  split annotationOverview.description (extracted string separated by /n)
  realK;//: number the human given real K
  centers;// Centers[]List of all quadrilateral form center
}

class Centers { 
  x;
  y;
  description;
}

/**
 * 
 * The plan is to feed a google vision result to this class, it will identify which point belong to which cluster
 * Once points inside cluster are figured out, their corresponding description are put together to get sentences,
 * This result is returned to the front end, ready fro translation or excel export
 * 
 * Input:
 * 
 * JsonFile {
 *  naiveK: number the number of points found, naively each can be a cluster
 *  realK: number the user given "true number" of clusters to be found
 *  centers: {
 *    x: number
 *    y: number
 *    description: string
 *  }[]
 * }
 * 
 * Python script that takes this input and run it through kmeans clustering transforms this data into output Json structure
 * 
 * Wanted Output:
 * 
 *  ReturnStructure {
 *     nbrCluster: number, the number of cluster
 *     clusters: {
 *        description: string;
 *        points: points as received in google vision part of the cluster
 *     }[]
 *  }
 */

class KMeansClustering { 

  async getSampleJson() { 
    const path = './assets/sample/kmeans-test-google.json'
    const data = fs.readFileSync(path);
    return JSON.parse(data)
  }

  async getDataFromSampleJson() { 
    const path = './assets/sample/kmeans-test-google.json'
    const imagesAnnotation = JSON.parse(fs.readFileSync(path));
    const data = imagesAnnotation.map(imageAnnotation => {
      const naiveK = this.getNaiveK(imageAnnotation)
      const centers = imageAnnotation.annotationDetails.map((details) => {
        const { x, y } = this.getQuadrilateralCenter(details.boundingPoly.vertices);
        return {
          description: details.description,
          x,
          y
        }
      });
      return {
        naiveK,
        centers
      };
    });
    return data;
  }

  writeJsonToFile(json, name) {
    const date = new Date();
    //const filename = `${name}-${date.toISOString()}`;
    const filename = name;
    fs.writeFile(`./assets/generatedData/${filename}.json`, JSON.stringify(json), 'utf8', () => { });
  }

  /**
   * Google vision pads with a 0 at the start hence -1
   * @param {*} imagesAnnotation 
   * @returns 
   */
  getNaiveK(imagesAnnotation) { 
    const description = imagesAnnotation.annotationOverview.description;
    return description.split('\n').length;
  }

  /**
   * Extract center of quadrilateral from vertice list
   * This is way trickier than I care to implement right now, I'll just take bottom right corner and call it a day for now
   * @param {*} vertices input from google vision type is {x: number, y: number}[]
   */
  getQuadrilateralCenter(vertices) { 
    return vertices[3]
  }

  runPythonScript(json) { 
    let result = {};
    const python = spawn('python', ['./scripts/kmeansClustering.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      result = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
    });
    return result;
  }

}

module.exports.KMeansClustering = KMeansClustering; 