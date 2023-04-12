import enum
import json
import sys
from ClusteringHelper import ClusteringHelper, ClusteringMethod
import argparse

class JsonInputType(enum.Enum):
    JSON = 'json'
    JSONPATH = 'jsonPath'

def main():

  parser = argparse.ArgumentParser()

  inputTypeHelp = """
                  The type of json input, 'json' for raw json pasted or given to the command or 'jsonPath' the path to a json file.
                  Note that the path to a json file is built from the directory of the script, account for it when launching from another directory
                  """
  parser.add_argument("inputType", type=JsonInputType,
                    help=inputTypeHelp)
  
  parser.add_argument("jsonContent", type=str,
                    help="The json input, either raw json or a string path to a json file, depend on the inputType")
  
  parser.add_argument("-ct","--clusteringType", type=ClusteringMethod, default=ClusteringMethod.MEAN_SHIFT, nargs='?',
                      help="The type of clustering to use, clustering method available are: kmeans, meanShift, ward")
  
  parser.add_argument("-cc", "--centroidCount", type=int, nargs='?',
                      help="The number of centroid to use for the clustering, default clustering type meanShift doesnt require any, kmeans and wards do")
  

  parser.add_argument("-g", "--graph", help="Open a graph representation of the result", action="store_true")

  
  args = parser.parse_args()

  clusteringHelper = ClusteringHelper()
  allGroupedClusters = []

  if args.inputType == JsonInputType.JSON:
    allGroupedClusters = clusteringHelper.getGroupedClusterFromJson(args.jsonContent, args.clusteringType, args.centroidCount)
    print(json.dump(allGroupedClusters, sys.stdout, indent=2))
  
  elif args.inputType ==  JsonInputType.JSONPATH:
    jsonData = clusteringHelper.getRawJsonFromFile(args.jsonContent)
    allGroupedClusters = clusteringHelper.getGroupedClusterFromJson(jsonData, args.clusteringType, args.centroidCount)
    print(json.dump(allGroupedClusters, sys.stdout, indent=2))

  if args.graph:
    clusteringHelper.clusterGraph(allGroupedClusters)
  
if __name__ == '__main__':
  main()