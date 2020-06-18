resource "azurerm_resource_group" "resource_group" {
  name     = "${var.name}ResourcesRg"
  location = var.location
}

output "resource_group_name" {
  value = azurerm_resource_group.resource_group.name
}

