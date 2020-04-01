variable "name" {
  description = "(Required) Specify the Service Name."
}
variable "infra_version" {
  description = "(Required) Version of the infrastructure."
}
variable "location" {
  description = "(Required) Specify the location for these resources. Changing this forces a new resource to be created."
  default     = "canadacentral"
}

#TODO: Automate this away
variable "locationprefix" {
  description = "(Required) Must align with location"
  default     = "C"
}

variable "docker_image" {
  description = "(Required) Specify the name of the container to be deployed"
}

variable "docker_image_tag" {
  description = "(Optional) Specify the tag to be deployed"
}

variable "environment" {
  description = "(Required) Value for the environment tag"
}

#TODO: Automate this away
variable "environmentprefix" {
  description = "(Required) prefix must align environment tag"
}

variable "service_owner" {
  description = "(Required) Value for the service owner tag"
}

variable "classification" {
  description = "(Required) the value for the classification tag"
}