# Clustering Helpers

These python classes are used, Gateway should be the class used to run the clustering

## Clustering Gateway

Direct run requires primary option, no option provided, options available for direct run:
- --json : run clustering on json provided as option
- --json-file : run clustering on json file, with path provided as option , path is relative to current location
    
Generic options (can be added after primary option and input):
- --graph : Output a graph based on json
      
ex: python3 Clustering.py --json-file ../assets/sample/generatedDataSample.json --graph

Note that the path to a json file is built from the directory of the script, account for it when launching from another directory

## Clustering Helper

Direct run requires option, no option provided, options available for direct run:

- --data-only : return parsed clusters as Json as output
- --cluster-graph : display a scatter graph of sample 

Direct run uses sample file at backend/assets/sample/generatedDataSample.json