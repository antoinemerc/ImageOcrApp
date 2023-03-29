const fs = require('fs');
const { readFileSync } = require('fs');
Plotly
class AnnotationStruct {
  naiveK;//: number;  split annotationOverview.description (extracted string separated by /n)
  realK;//: number the human given real K
  data;//[ {x: number,y: number}, ...] List of all quadrilateral form center
}


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
        return this.getQuadrilateralCenter(details.boundingPoly.vertices);
      });
      return {
        naiveK,
        centers
      };
    });
    return data;
  }

  /**
   * Google vision pads with a 0 at the start hence -1
   * @param {*} imagesAnnotation 
   * @returns 
   */
  getNaiveK(imagesAnnotation) { 
    const description = imagesAnnotation.annotationOverview.description;
    return description.split('\n').length - 1;
  }

  /**
   * Extract center of quadrilateral from vertice list
   * This is way trickier than I care to implement right now, I'll just take bottom right corner and call it a day for now
   * @param {*} vertices input from google vision type is {x: number, y: number}[]
   */
  getQuadrilateralCenter(vertices) { 
    return vertices[3]
  }


  getRandomCentroids(dataset, k) {
    // selects random points as centroids from the dataset
    const numSamples = dataset.length;
    const centroidsIndex = [];
    let index;
    while (centroidsIndex.length < k) {
      index = randomBetween(0, numSamples);
      if (centroidsIndex.indexOf(index) === -1) {
        centroidsIndex.push(index);
      }
    }
    const centroids = [];
    for (let i = 0; i < centroidsIndex.length; i++) {
      const centroid = [...dataset[centroidsIndex[i]]];
      centroids.push(centroid);
    }
    return centroids;
  }

}

module.exports.KMeansClustering = KMeansClustering; 