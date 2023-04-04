import json
import sys
from Clustering import Clustering, ClusteringMethod

def main():
  if len(sys.argv) > 1:
    clusteringHelper = Clustering()
    allGroupedClusters = []

    if str(sys.argv[1]) == "--json":
      jsonData = json.load(sys.argv[2])
      allGroupedClusters = clusteringHelper.getGroupedClusterFromJson(jsonData, ClusteringMethod.MEAN_SHIFT)
      json.dumps(allGroupedClusters)

    elif str(sys.argv[1] )== "--json-file":
      jsonData = clusteringHelper.getRawJsonFromFile(sys.argv[2])
      allGroupedClusters = clusteringHelper.getGroupedClusterFromJson(jsonData, ClusteringMethod.MEAN_SHIFT)
      json.dump(allGroupedClusters, sys.stdout, indent=2)

    if str(sys.argv[3]) == "--graph":
      clusteringHelper.clusterGraph(allGroupedClusters)
  else:
    msg = """
    Direct run requires primary option, no option provided, options available for direct run:
      --json : run clustering on json provided as option
      --json-file : run clustering on json file, with path provided as option , path is relative to current location
    
    Generic options (can be added after primary option and input):
      --graph : Output a graph based on json
      
      ex: python3 Clustering.py --json-file ../assets/sample/generatedDataSample.json --graph   

    Note that the path to a json file is built from the directory of the script, account for it when launching from another directory
    """
    print(msg)

if __name__ == '__main__':
  main()