import enum
import json
from pathlib import Path
import sys
from typing import List, Tuple
from matplotlib import pyplot as plt

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
    """ Get data from the specified jsonFile, default to assets/sample/generatedDataSample.json if empty
    Returns; Json Dictionnary
    """
    jsonRelativePath = jsonRelativePath if jsonRelativePath else "../assets/sample/generatedDataSample.json"
    path = Path(__file__).parent / jsonRelativePath
    rawJson = None
    with path.open() as f:
      # returns JSON object as a dictionary
      rawJson = json.load(f)
    return rawJson

  def getDataFromJson(self, jsonData) -> List[Tuple[List[str], List, List]]:
    """
    Get data from the given json
    the Json has a structure like
    [
      {
        "naiveK": 12,
        "centers": [
          {
            "description": "O",
            "centroid": [17,-231],
            "boundingPoly": [{  "x": 14,  "y": 111},{  "x": 145,  "y": 108},{  "x": 148,  "y": 228},{  "x": 17,  "y": 231}, ...]
          },...
      ]
    Returns:
      List [
        points: List of array of points such as [[1,0],[3,6]] with [[x0,y0],[x1,x2]]
        label: the attached description of the point
        boundingPoly: List of 4 corner of google vision bounding poly
      ]
    """
    allImageData = []
    for i in jsonData:
      points = []
      label = []
      boundingPoly = []
      for center in i['centers']:
        label.append(center['description'])
        points.append([center['centroid']['x'], center['centroid']['y']])
        boundingPoly.append(center['boundingPoly'])
      allImageData.append((points, label, boundingPoly))
  
    return allImageData

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

  def groupClusters(self, clusters, points, labels, boundingPoly):
    groupedClusters = {}
    for i in range(len(clusters)):
      if clusters[i] in groupedClusters:
        groupedClusters[int(clusters[i])].append({"point": points[i], "label": labels[i], "boundingPoly": boundingPoly[i]})
      else:
        groupedClusters[int(clusters[i])] = [{"point": points[i], "label": labels[i], "boundingPoly": boundingPoly[i]}]

    return groupedClusters
  
  def getGroupedClusterFromJson(self, jsonData, clusteringMethod: ClusteringMethod, clusterNumber=1):
    """ Get Grouped cluster from Json and output them
    Parameter: clusterNumber is used for ClusteringMethod 'Ward' and 'KMeans', MeanShift will ignore it"""
    allImageData = self.getDataFromJson(jsonData)
    allGroupedClusters = []
    for (points, labels, boundingPoly) in allImageData:
      npPoints = np.array(points)
      clusters = self.getClusters(clusterNumber, npPoints, clusteringMethod)
      allGroupedClusters.append(self.groupClusters(clusters, points, labels, boundingPoly))
    return allGroupedClusters

  def getMockDataFromJsonFile(self, jsonRelativePath = None) -> List:
    """ Get data from the specified jsonFile, default to assets/sample/generatedDataSample.json if empty
    Returns: see getDataFromJson
    """
    jsonData = self.getRawJsonFromFile(jsonRelativePath)
    return self.getDataFromJson(jsonData)
    

  def getClusterForTests(self):
    """ Get Sample Json and output it's grouped cluster """
    allImageData = self.getMockDataFromJsonFile()
    allGroupedClusters = []
    for (points, labels, boundingPoly) in allImageData: 
      clusters = self.getClusters(3, np.array(points), ClusteringMethod.MEAN_SHIFT)
      allGroupedClusters.append(self.groupClusters(clusters, points, labels, boundingPoly))
    return allGroupedClusters

  def clusterGraph(self, allGroupedClusters=None):
    """ Displays a graph representation of given allGroupedClusters, will give sample if none provided """
    allGroupedClusters = allGroupedClusters if allGroupedClusters != None else self.getClusterForTests()
    for groupedClusters in allGroupedClusters:
      for cluster, pointsInCluster in groupedClusters.items():
        xPointToScatter = []
        yPointToScatter = []

        for dataPoint in pointsInCluster:
          xPointToScatter.append(dataPoint["point"][0])
          # multiply by -1 as google vision origin is at bottom left, which messes up coordinate for graph to look like image
          yPointToScatter.append(dataPoint["point"][1] * -1)

          plt.annotate(dataPoint["label"], (dataPoint["point"][0], (dataPoint["point"][1]+0.5) * -1))
        plt.scatter(xPointToScatter, yPointToScatter)

      plt.show()

def main():
  if len(sys.argv) > 1:
    if str(sys.argv[1]) == "--data-only":
      cluster = Clustering()
      allGroupedClusters = cluster.getClusterForTests()
      print(allGroupedClusters)

    elif str(sys.argv[1] == "--cluster-graph"):
      cluster = Clustering()
      allGroupedClusters = cluster.getClusterForTests()
      cluster.clusterGraph(allGroupedClusters)
  else:
    msg = """
    Direct run requires option, no option provided, options available for direct run:
      --data-only : return parsed clusters as Json as output
      --cluster-graph : display a scatter graph of sample 
    Direct run uses sample file
    """
    print(msg)

if __name__ == '__main__':
  main()