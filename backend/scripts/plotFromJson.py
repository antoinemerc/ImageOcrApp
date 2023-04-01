import json
from pathlib import Path
from matplotlib import pyplot
import matplotlib.pyplot as plt

from matplotlib.pyplot import plot
import numpy as np
from sklearn.cluster import AgglomerativeClustering

def getData():
  path = Path(__file__).parent / "../assets/generatedData/generatedData.json"
  xPoints = []
  yPoints = [] 
  points = []
  label = []
  with path.open() as f:
    # returns JSON object as a dictionary
    data = json.load(f)
    for i in data:
      for center in i['centers']:
        xPoints.append(center['x'])
        yPoints.append(center['y'])
        points.append([center['x'], center['y']])
        label.append(center['description'])
    
  return xPoints, yPoints, label, points

xPoints, yPoints, labels, points = getData()

plt.scatter(xPoints,yPoints)

npPoints = np.array(points)
ward = AgglomerativeClustering(n_clusters=3, linkage="ward").fit_predict(npPoints)

clusters = {}
for i in range(len(ward)):
  if ward[i] in clusters:
    clusters[i].append([xPoints[i], yPoints[i]], labels[i])
  else:
    clusters[i] = [[xPoints[i], yPoints[i]], labels[i]]

print(clusters)

for j in range(len(xPoints)):
  plt.annotate(labels[j], (xPoints[j], yPoints[j]+0.5))

plt.show()

  # Closing file
