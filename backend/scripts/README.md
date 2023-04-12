# Clustering Helpers

Gateway should be the class used to run the clustering helper, direct run is possible for debug purpose

## Clustering Gateway

usage: ClusteringGateway.py [-h] [-ct [CLUSTERINGTYPE]] [-cc [CENTROIDCOUNT]] [-g] inputType jsonContent

| Positionnal Arguments       | Description |
| -------------------- | ----------- |
| inputType            | The type of json input, 'json' for raw json pasted or given to the command or 'jsonPath' the path to a json file. Note that the path to a json file is built from the directory of the script, account for it when launching from another directory |
|  jsonContent      |     The json input, either raw json or a string path to a json file, depend on the inputType |

options:
| Options                | Description |
| ---------------------- | ----------- |
|  -h, --help            | show this help message and exit |
|  -ct [CLUSTERINGTYPE], --clusteringType [CLUSTERINGTYPE] | The type of clustering to use, clustering method available are: kmeans, meanShift, ward |
|  -cc [CENTROIDCOUNT], --centroidCount [CENTROIDCOUNT] | The number of centroid to use for the clustering, default clustering type meanShift doesnt require any, kmeans and wards do |
|  -g, --graph           |     Open a graph representation of the result |
      

## Command example: 
- ex: python3 Clustering.py json-file ../assets/sample/generatedDataSample.json --graph
- ex: python3 Clustering.py json '{my json here}'
- ex: python3 Clustering.py json '{my json here}' -ct "ward" -cc 2
- ex: python3 Clustering.py json '{my json here}' --graph -ct "ward" -cc 4 
- ex: python3 Clustering.py json '{my json here}' --graph -ct "kmeans" -cc 10

Note that the path to a json file is built from the directory of the script, account for it when launching from another directory

## Clustering Helper

Direct run requires option, no option provided, options available for direct run:

- --data-only : return parsed clusters as Json as output
- --cluster-graph : display a scatter graph of sample 

Direct run uses sample file at backend/assets/sample/sanitizedGoogleVisionJson.json