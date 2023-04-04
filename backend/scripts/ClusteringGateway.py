import json
import sys
from Clustering import Clustering

def main():
  if len(sys.argv) > 1:
    if str(sys.argv[1]) == "--json":
      clusteringHelper = Clustering()
      jsonData = json.load(sys.argv[2])
      groupedClusters = clusteringHelper.getGroupedClusterFromJson(jsonData)
      json.dumps(groupedClusters)

    elif str(sys.argv[1] == "--json-file"):
      clusteringHelper = Clustering()
      jsonData = clusteringHelper.getRawJsonFromFile(sys.argv[2])
      groupedClusters = clusteringHelper.getGroupedClusterFromJson(jsonData)
      json.dumps(groupedClusters)

  else:
    msg = """
    Direct run requires primary option, no option provided, options available for direct run:
      --json : run clustering on json provided as option
      --json-file : run clustering on json file, with path provided as option , path is relative to current location
    
    Generic options (can be added after primary option and input):
      --graph : Output a graph based on json
      
      ex: python3 Clustering.py --json-file ../assets/sample/generatedDataSample.json --graph     
    """
    print(msg)

if __name__ == '__main__':
  main()