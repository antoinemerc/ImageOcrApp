from pathlib import Path
from matplotlib import pyplot
import matplotlib.pyplot as plt

from matplotlib.pyplot import plot
import numpy as np
from Clustering import Clustering, ClusteringMethod

clusteringHelper = Clustering()
xPoints, yPoints, labels, points = clusteringHelper.getMockDataFromJsonFile()

npPoints = np.array(points)
npLabels = np.array(labels)

clusters = clusteringHelper.getClusters(3, npPoints, ClusteringMethod.MEAN_SHIFT)
groupedClusters = clusteringHelper.groupClusters(clusters, points, labels)

for cluster, pointsInCluster in groupedClusters.items():
  xPointToScatter = []
  yPointToScatter = []

  for ([pointX, pointY], label) in pointsInCluster:
    xPointToScatter.append(pointX)
    yPointToScatter.append(pointY)

    plt.annotate(label, (pointX, pointY+0.5))
  plt.scatter(xPointToScatter, yPointToScatter)


  # plt.scatter(cluster[0],cluster[1])

# print(groupedClusters)

for j in range(len(xPoints)):
  plt.annotate(labels[j], (xPoints[j], yPoints[j]+0.5))

plt.show()

  # Closing file
