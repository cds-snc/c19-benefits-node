variable "name" {
  description = "(Required) Specify the Service Name."
}

variable "location" {
  description = "(Required) Specify the location for these resources. Changing this forces a new resource to be created."
  default     = "canadacentral"
}

variable "docker_image" {
  description = "(Required) Specify the name of the container to be deployed"
}

variable "docker_image_tag" {
  description = "(Optional) Specify the tag to be deployed"
}


variable "airtable_api_key" {
  description = "(Required) API Key for airtable shoudld be kept secret and in an a terraform variables file that isn't in git"
}

variable "airtable_base_id" {
  description = "(Required) API Key for airtable shoudld be kept secret and in an a terraform variables file that isn't in git"
}