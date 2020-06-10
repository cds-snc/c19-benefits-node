ENVIRONMENT=$1
az account set --subscription "MTS"
az aks get-credentials --resource-group DTS-Dev --name DTS-Dev-K8S
export RESOURCE_GROUP="DTS-Dev"
export AKS_NAME="DTS-Dev-K8S"
kubectl create namespace benefits-$ENVIRONMENT
#source ./sub-scripts/set-env-variables.sh
