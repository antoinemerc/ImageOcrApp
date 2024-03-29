const fs = require('fs');
const { spawn } = require('child_process');

/**
 * 
 * The plan is to feed a google vision result to this class, it will identify which point belong to which cluster
 * Once points inside cluster are figured out, their corresponding description are put together to get sentences,
 * This result is returned to the front end, ready fro translation or excel export
 * 
 * Input:
 * 
 * JsonFile [
 *  {
 *    "annotation": [
 *       {
 *         "description": "O",
 *         "boundingPoly": {
 *           "vertices": [
 *             { "x": 14, "y": 111},
 *             { "x": 145, "y": 108},
 *             { "x": 148, "y": 228},
 *             { "x": 17, "y": 231 }
 *           ]
 *         }
 *       }, ...
 *     ]
 *   }, ...
 * ]
 * 
 * Python script that takes this input and run it through kmeans clustering transforms this data into output Json structure
 * 
 * Output:
 *  [ 
 *    { 
 *      "1": [
 *       { "point": [ 130, 722 ], "label": "WOULD", "id": 3646 },
 *       { "point": [ 130, 741 ], "label": "WOULD", "id": 3646 },
 *       { "point": [ 138, 756 ], "label": "RATHER", "id": 3816 },
 *       { "point": [ 138, 776 ], "label": "RATHER", "id": 3816 } 
 *      ],
 *      "2": [ ... cluster 2 ... ],
 *      ...
 *    }, 
 *    { ... image2 ... },
 *    ....
 *  ]
 */

class Clustering { 

  supportedClusteringType = ['kmeans', 'meanShift', 'ward']

  getSampleJson() { 
    const path = './assets/sample/kmeans-test-google.json'
    return JSON.parse(fs.readFileSync(path))
  }

  async getDataFromSampleJson() { 
    const imagesAnnotation = await this.getSampleJson();
    const data = imagesAnnotation.map(imageAnnotation => {
      const annotation = imageAnnotation.annotationDetails.map((details) => {
        return {
          description: details.description,
          boundingPoly: {
            vertices: details.boundingPoly.vertices
          }
        }
      });
      return {
        annotation: annotation
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

  runPythonScript(cmdArguments) { 
    
    const scriptExecution = new Promise((resolve, reject) => { 
      const child = spawn('python3', ['./scripts/ClusteringGateway.py', ...cmdArguments]);
      let result = '';   
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data) => {
        console.log('Pipe data from python script ...');
        result = data.toString();
        resolve(result);
      });
      child.on('close', (code) => {
        resolve('No Data');
        console.log(`child process close all stdio with code ${code}`);
      });
    })
    return scriptExecution;
  }

  async testPythonPipeline() { 
    const json = await this.getDataFromSampleJson();
    let commandLineArgument = ['json', JSON.stringify(json), '-ct', 'meanShift']
    return await this.runPythonScript(commandLineArgument)
  }

  async getClusteringForJson(json, clusteringType = null, centroidCount = null) { 

    const sanitizedJson = await this.getDataFromSampleJson();
    let commandLineArgument = ['json', JSON.stringify(sanitizedJson)];

    if (clusteringType !== null && centroidCount !== undefined) {
      if (!this.supportedClusteringType.includes(clusteringType))
        throw new Error(`ERROR - Unknown cluster type (Accepted values: ${this.supportedClusteringType.join(', ')})`)
      
      commandLineArgument = [...commandLineArgument, '-ct', clusteringType];
    }

    if (centroidCount !== null && centroidCount !== undefined) { 
      commandLineArgument = [...commandLineArgument, '-cc', centroidCount];
    }
    
    return await this.runPythonScript(commandLineArgument)
  }
}

module.exports.Clustering = Clustering; 


