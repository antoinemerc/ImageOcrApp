import enum
import json
from pathlib import Path
from typing import List, Tuple

import numpy as np
from sklearn.cluster import AgglomerativeClustering, KMeans
from sklearn.cluster import SpectralClustering
from sklearn.cluster import MeanShift

class ClusteringMethod(enum.Enum):
    KMEANS = 'kmeans'
    MEAN_SHIFT = 'meanShift'
    WARD_AGGLO_CLUSTERING = 'ward'

class Clustering:

  def getRawJsonFromFile(self, jsonRelativePath) -> dict:
    """ Get data from the specified jsonFile, default to assets/generatedData/generatedData.json if empty
    Returns; Json Dictionnary
    """
    jsonRelativePath = jsonRelativePath if jsonRelativePath else "../assets/generatedData/generatedData.json"
    path = Path(__file__).parent / jsonRelativePath
    rawJson = None
    with path.open() as f:
      # returns JSON object as a dictionary
      rawJson = json.load(f)
    return rawJson

  def getDataFromJson(self, jsonData) -> Tuple[List[int], List[int], List[str], List]:
    """ Get data from the given json
    the Json has a structure like
    {
      "naiveK": 12,
      "centers": [
        {
          "description": "O",
          "x": 17,
          "y": -231
        },...
      ]
    }
    Returns:
      xPoints: List of x coordinate for points
      yPoints: List of y coordinate for points
      description: the attached description of the point
      points: List of array of points such as [[1,0],[3,6]] with [[x0,y0],[x1,x2]]
    """
    xPoints = []
    yPoints = [] 
    points = []
    label = []
    for i in jsonData:
      for center in i['centers']:
        xPoints.append(center['x'])
        yPoints.append(center['y'])
        label.append(center['description'])
        points.append([center['x'], center['y']])
      
    return xPoints, yPoints, label, points

  def getMockDataFromJsonFile(self, jsonRelativePath = None) -> Tuple[List[int], List[int], List[str], List]:
    """ Get data from the specified jsonFile, default to assets/generatedData/generatedData.json if empty
    Returns: see getDataFromJson
    """
    jsonData = self.getRawJsonFromFile(jsonRelativePath)
    return self.getDataFromJson(jsonData)
    

  def getClusters(self, nbCluster: int, npPoints, clustering: ClusteringMethod):
    res = None
    if clustering == ClusteringMethod.KMEANS:
      kmeans = KMeans(n_clusters=nbCluster, random_state=0, n_init="auto", algorithm="elkan", max_iter=500).fit(npPoints)
      res = kmeans.fit_predict(npPoints)
    elif clustering == ClusteringMethod.MEAN_SHIFT:
      meanShift = MeanShift().fit(npPoints)
      res = meanShift.fit_predict(npPoints)
    elif clustering == ClusteringMethod.WARD_AGGLO_CLUSTERING:
      res = AgglomerativeClustering(n_clusters=nbCluster, linkage="ward").fit_predict(npPoints)
    else:
      res = AgglomerativeClustering(n_clusters=nbCluster, linkage="ward").fit_predict(npPoints)
    return res

  def groupClusters(self, clusters, points, labels):
    groupedClusters = {}
    for i in range(len(clusters)):
      if clusters[i] in groupedClusters:
        groupedClusters[clusters[i]].append((points[i], labels[i]))
      else:
        groupedClusters[clusters[i]] = [(points[i], labels[i])]

    return groupedClusters

  def runClusterForTests(self):

    xPoints, yPoints, labels, points = self.getMockDataFromJsonFile()

    npPoints = np.array(points)
    npLabels = np.array(labels)

    clusters = self.getClusters(3, npPoints, ClusteringMethod.MEAN_SHIFT)
    print(clusters)
    groupedClusters = self.groupClusters(clusters, points, labels)

    for key, item in groupedClusters.items():
      print(f'{key}: {item}')


def main():
  cluster = Clustering()
  cluster.runClusterForTests()

if __name__ == '__main__':
  main()